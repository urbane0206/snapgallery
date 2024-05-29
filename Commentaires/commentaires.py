from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import PrimaryKeyConstraint

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Configuration pour utiliser PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@commentaire_db:5432/CommentaireDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Définition du modèle pour les "likes" sur les images
class ImageLike(db.Model):
    __tablename__ = 'image_like'
    image_url = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Boolean, nullable=False, default=True)
    views = db.Column(db.Integer, default=0)
    __table_args__ = (
        PrimaryKeyConstraint('image_url', 'username'),
        {},
    )

    def to_dict(self):
        return {
            'image_url': self.image_url,
            'likes': self.likes,
            'username': self.username,
            'views': self.views
        }


# Définition du modèle pour les "likes" sur les commentaires
class CommentLike(db.Model):
    __tablename__ = 'comment_like'
    comment_id = db.Column(db.Integer, nullable=False)
    username = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Boolean, nullable=False, default=True)
    __table_args__ = (
        PrimaryKeyConstraint('comment_id', 'username'),
        {},
    )

    def to_dict(self):
        return {
            'comment_id': self.comment_id,
            'likes': self.likes,
            'username': self.username,
        }

# Définition du modèle pour les commentaires
class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now)
    user_id = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': self.likes,
            'dislikes': self.dislikes,
            'created_at': self.created_at.strftime('%d/%m/%Y %H:%M'),
            'user_id': self.user_id,
            'image_url': self.image_url,
            'username': self.username,
        }

# Crée les tables avant chaque requête si elles n'existent pas déjà
@app.before_request
def create_tables():
    app.before_request_funcs[None].remove(create_tables)
    db.create_all()

# Ajoute des en-têtes pour les requêtes après chaque réponse
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Route d'accueil de l'API
@app.route('/')
def home():
    return jsonify({'message': "Bienvenue sur l'API des Commentaires!"})

# Crée un nouveau commentaire
@app.route('/comments', methods=['POST'])
def create_comment():
    user_id = request.json.get('user_id')
    image_url = request.json.get('image_url')
    username = request.json.get('username')
    content = request.json.get('content')

    if not user_id or not image_url or not content:
        return jsonify({'error': 'Missing data: user_id, image_url, and content are required'}), 400

    try:
        comment = Comment(content=content, user_id=user_id, image_url=image_url, username=username)
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create comment'}), 500

@app.route('/images/<path:image_url>/view', methods=['POST'])
def increment_image_views(image_url):
    try:
        image_like = ImageLike.query.filter_by(image_url=image_url).first()
        if image_like:
            image_like.views += 1
        else:
            image_like = ImageLike(image_url=image_url, username='', views=1)
            db.session.add(image_like)
        db.session.commit()
        return jsonify({'views': image_like.views}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to increment image views'}), 500

@app.route('/images/<path:image_url>/likes-dislikes', methods=['GET'])
def get_image_likes_dislikes(image_url):
    current_user = request.args.get('username')
    try:
        likes = ImageLike.query.filter_by(image_url=image_url, likes=True).count()
        dislikes = ImageLike.query.filter_by(image_url=image_url, likes=False).count()
        liked_by_user = ImageLike.query.filter_by(image_url=image_url, username=current_user, likes=True).first() is not None
        disliked_by_user = ImageLike.query.filter_by(image_url=image_url, username=current_user, likes=False).first() is not None
        views = ImageLike.query.filter_by(image_url=image_url).first().views
        return jsonify({
            'likes': likes,
            'dislikes': dislikes,
            'liked_by_user': liked_by_user,
            'disliked_by_user': disliked_by_user,
            'views': views
        }), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch image likes/dislikes'}), 500


@app.route('/images/<path:image_url>/like', methods=['POST'])
def like_image(image_url):
    username = request.json.get('username')

    existing_like = ImageLike.query.filter_by(image_url=image_url, username=username, likes=True).first()
    existing_dislike = ImageLike.query.filter_by(image_url=image_url, username=username, likes=False).first()

    if existing_like:
        db.session.delete(existing_like)
    else:
        if existing_dislike:
            db.session.delete(existing_dislike)
        
        new_like = ImageLike(image_url=image_url, username=username, likes=True)
        db.session.add(new_like)

    db.session.commit()

    likes = ImageLike.query.filter_by(image_url=image_url, likes=True).count()
    dislikes = ImageLike.query.filter_by(image_url=image_url, likes=False).count()
    return jsonify({'likes': likes, 'dislikes': dislikes, 'liked_by_user': True, 'disliked_by_user': False}), 200

@app.route('/images/<path:image_url>/dislike', methods=['POST'])
def dislike_image(image_url):
    username = request.json.get('username')

    existing_like = ImageLike.query.filter_by(image_url=image_url, username=username, likes=True).first()
    existing_dislike = ImageLike.query.filter_by(image_url=image_url, username=username, likes=False).first()

    if existing_dislike:
        db.session.delete(existing_dislike)
    else:
        if existing_like:
            db.session.delete(existing_like)
        
        new_dislike = ImageLike(image_url=image_url, username=username, likes=False)
        db.session.add(new_dislike)

    db.session.commit()

    likes = ImageLike.query.filter_by(image_url=image_url, likes=True).count()
    dislikes = ImageLike.query.filter_by(image_url=image_url, likes=False).count()
    return jsonify({'likes': likes, 'dislikes': dislikes, 'liked_by_user': False, 'disliked_by_user': True}), 200


# Récupère les commentaires pour une image spécifique
@app.route('/comments/by-image/<path:image_url>', methods=['GET'])
def get_comments_by_image(image_url):
    current_user = request.args.get('username')  # Ajoutez le username de l'utilisateur connecté
    try:
        comments = Comment.query.filter_by(image_url=image_url).all()
        comments_data = []
        for comment in comments:
            liked_by_user = CommentLike.query.filter_by(comment_id=comment.id, username=current_user, likes=True).first() is not None
            disliked_by_user = CommentLike.query.filter_by(comment_id=comment.id, username=current_user, likes=False).first() is not None
            comment_data = comment.to_dict()
            comment_data['liked_by_user'] = liked_by_user
            comment_data['disliked_by_user'] = disliked_by_user
            comments_data.append(comment_data)
        return jsonify(comments_data), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch comments'}), 500

# Met à jour un commentaire existant
@app.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.json
    current_user_id = int(data.get('user_id'))  # Convertir en entier

    app.logger.info(f'Comment ID: {comment_id}, User ID: {current_user_id}, Data: {data}')

    if comment.user_id != current_user_id:
        return jsonify({"error": "You can only edit your own comments"}), 403

    if 'content' in data:
        comment.content = data['content']
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    return jsonify({"error": "Content is required"}), 400

# Supprime un commentaire existant
@app.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.json
    current_user_id = int(data.get('user_id'))  # Convertir en entier

    app.logger.info(f'Comment ID: {comment_id}, User ID: {current_user_id}, Data: {data}')

    if comment.user_id != current_user_id:
        return jsonify({"error": "You can only delete your own comments"}), 403

    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'}), 200

# Récupère le nombre de commentaires pour une image spécifique
@app.route('/comments/by-image/<path:image_url>/count', methods=['GET'])
def get_comments_count_by_image(image_url):
    try:
        count = Comment.query.filter_by(image_url=image_url).count()
        return jsonify({'count': count}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch comment count'}), 500

# Récupère tous les commentaires
@app.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments])

# Ajoute un "like" à un commentaire
@app.route('/comments/<int:comment_id>/like', methods=['POST'])
def like_comment(comment_id):
    username = request.json.get('username')
    comment = Comment.query.get_or_404(comment_id)

    existing_like = CommentLike.query.filter_by(comment_id=comment_id, username=username, likes=True).first()
    existing_dislike = CommentLike.query.filter_by(comment_id=comment_id, username=username, likes=False).first()

    if existing_like:
        db.session.delete(existing_like)
        comment.likes -= 1
    else:
        if existing_dislike:
            db.session.delete(existing_dislike)
            comment.dislikes -= 1
        
        new_like = CommentLike(comment_id=comment_id, username=username, likes=True)
        db.session.add(new_like)
        comment.likes += 1

    db.session.commit()
    return jsonify(comment.to_dict()), 200

# Ajoute un "dislike" à un commentaire
@app.route('/comments/<int:comment_id>/dislike', methods=['POST'])
def dislike_comment(comment_id):
    username = request.json.get('username')
    comment = Comment.query.get_or_404(comment_id)

    existing_like = CommentLike.query.filter_by(comment_id=comment_id, username=username, likes=True).first()
    existing_dislike = CommentLike.query.filter_by(comment_id=comment_id, username=username, likes=False).first()

    if existing_dislike:
        db.session.delete(existing_dislike)
        comment.dislikes -= 1
    else:
        if existing_like:
            db.session.delete(existing_like)
            comment.likes -= 1
        
        new_dislike = CommentLike(comment_id=comment_id, username=username, likes=False)
        db.session.add(new_dislike)
        comment.dislikes += 1

    db.session.commit()
    return jsonify(comment.to_dict()), 200

# Récupère le nombre de "likes" d'un commentaire
@app.route('/comments/<int:comment_id>/like', methods=['GET'])
def get_likes(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({'likes': comment.likes})

# Récupère le nombre de "dislikes" d'un commentaire
@app.route('/comments/<int:comment_id>/dislike', methods=['GET'])
def get_dislikes(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({'dislikes': comment.dislikes})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
