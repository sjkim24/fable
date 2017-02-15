class Follow < AcitveRecord::Base
  belongs_to :user,
    class: "User",
    foreign_key: :follower_id
end