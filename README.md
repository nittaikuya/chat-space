## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|name|string|null: false, add_index: true|
### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupテーブル
|Column|Type|option|
|------|----|------|
|name|string|null: false, unque: ttrue|

## Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages

## massageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Association
- bolongs_to :group
- belongs_ to :user