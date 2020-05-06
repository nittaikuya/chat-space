$(function(){ 
  function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="message">
            <div class="chat-main__chat">
              <div class="chat-main__chat__upper-info">
                <div class="chat-main__chat__upper-info__talker">
                  ${message.user_name}
                </div>
                <div class="chat-main__chat__upper-info__date">
                  ${message.created_at}
                </div>
              </div>
            </div>
            <div class="chat-main__chat__text">
              ${message.content}
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
          `<div class="message">
            <div class="chat-main__chat">
              <div class="chat-main__chat__upper-info">
                <div class="chat-main__chat__upper-info__talker">
                  ${message.user_name}
                </div>
                <div class="chat-main__chat__upper-info__date">
                  ${message.created_at}
                </div>
              </div>
            </div>
            <div class="chat-main__chat__text">
              ${message.content}
            </div>
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 

 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
   
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('form')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('.submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});

