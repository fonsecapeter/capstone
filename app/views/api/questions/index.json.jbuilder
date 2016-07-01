@questions.each do |question|
  json.set! question.id do
    json.id question.id
    json.title question.title
    json.description question.description
    json.authorId question.author_id
    json.authorName question.author.username
  end
end
