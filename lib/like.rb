module Like
  def liked?(user_id, model, model_id) # two model_ids are story_id and comment_id
    id_attr = model.concat("_id").to_sym
    self.where(user_id: user_id, id_attr: model_id)
  end
end