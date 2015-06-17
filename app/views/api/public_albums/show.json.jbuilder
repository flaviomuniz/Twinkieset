json.extract!(@album, :id, :title, :event_date, :status, :created_at, :updated_at)
time = Time.parse(@album.event_date.to_s)
json.string_date time.strftime("%B #{time.day.ordinalize}, %Y")
json.first_subalbum_id @album.subalbums.first.id
if @album.cover_image
  json.cover_image_url @album.cover_image.image_url
else
  json.cover_image_url nil
end
json.subalbums @album.subalbums.each do |subalbum|
  json.extract!(subalbum, :id, :title, :order, :album_id)

  json.photos subalbum.photos.each do |photo|
    json.extract!(photo, :id, :image_url, :order, :file_name, :medium_url)
  end
end
