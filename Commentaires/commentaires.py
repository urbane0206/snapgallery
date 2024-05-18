from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration pour utiliser PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:10001/CommentaireDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': self.likes,
            'dislikes': self.dislikes,
            'created_at': self.created_at.strftime('%d/%m/%Y %H:%M')
        }

@app.before_request
def create_tables():
    db.create_all()

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Comment API!'})

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

@app.route('/comments', methods=['POST'])
def add_comment():
    data = request.json
    if not data or 'content' not in data:
        return jsonify({'error': 'Content is required'}), 400
    comment = Comment(content=data['content'])
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@app.route('/comments/count', methods=['GET'])
def get_comments_count():
    count = Comment.query.count()
    return jsonify({'count': count})

@app.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.to_dict() for comment in comments])

@app.route('/comments/<int:comment_id>/like', methods=['POST'])
def like_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    comment.likes += 1
    db.session.commit()
    return jsonify(comment.to_dict())

@app.route('/comments/<int:comment_id>/dislike', methods=['POST'])
def dislike_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    comment.dislikes += 1
    db.session.commit()
    return jsonify(comment.to_dict())

@app.route('/comments/<int:comment_id>/like', methods=['GET'])
def get_likes(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({'likes': comment.likes})

@app.route('/comments/<int:comment_id>/dislike', methods=['GET'])
def get_dislikes(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    return jsonify({'dislikes': comment.dislikes})

if __name__ == '__main__':
    app.run(debug=True)
