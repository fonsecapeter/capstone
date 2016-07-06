const React = require('react');
const NewCommentForm = require('./new_comment_form');
const CommentIndexItem = require('./comment_index_item');
const cloudinaryConfig = require('react-cloudinary').cloudinaryConfig;
const CloudinaryImage = require('react-cloudinary').CloudinaryImage;
cloudinaryConfig({ cloud_name: 'dxhqr7u1z' });
const userPublicId = 'user_j20bee';

const CommentIndex = React.createClass({
  render () {
    return (
      <div className="comment-index">
        <NewCommentForm />
        <table>
          <tbody>
            {
              this.props.comments.map( comment => {
                return (
                  <CommentIndexItem
                    comment={ comment }
                    key={ comment.id } />
                );
              }).reverse()
            }
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = CommentIndex;