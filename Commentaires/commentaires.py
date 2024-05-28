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
@app.before_request
def create_tables():
    # The following line will remove this handler, making it
    # only run on the first request
    app.before_request_funcs[None].remove(create_tables)

    db.create_all()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Comment API!'})

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

@app.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    data = request.json
    if 'content' in data:
        comment.content = data['content']
        db.session.commit()
        return jsonify(comment.to_dict()), 200
    return jsonify({"error": "Content is required"}), 400

@app.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'}), 200

@app.route('/comments/by-image/<path:image_url>/count', methods=['GET'])
def get_comments_count_by_image(image_url):
    try:
        count = Comment.query.filter_by(image_url=image_url).count()
        return jsonify({'count': count}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch comment count'}), 500

@app.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments])

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

@app.route('/comments/<int:comment_id>/like', methods=['GET'])
def get_likes(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({'likes': comment.likes})

@app.route('/comments/<int:comment_id>/dislike', methods=['GET'])
def get_dislikes(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({'dislikes': comment.dislikes})

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)
