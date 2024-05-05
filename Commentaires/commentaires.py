from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///comments.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    likes = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow())

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'likes': self.likes,
            'created_at': self.created_at.isoformat()
        }

@app.before_request
def create_tables():
    db.create_all()

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Comment API!'})

@app.route('/comments', methods=['POST'])
def add_comment():
    data = request.json
    if not data or 'content' not in data:
        return jsonify({'error': 'Content is required'}), 400
    comment = Comment(content=data['content'])
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@app.route('/comments/<int:comment_id>/like', methods=['POST'])
def like_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    comment.likes += 1
    db.session.commit()
    return jsonify(comment.to_dict())

@app.route('/comments/<int:comment_id>/share', methods=['GET'])
def share_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404
    return jsonify(comment.to_dict())

if __name__ == '__main__':
    app.run(debug=True)