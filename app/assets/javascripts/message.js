$(function(){ 
  function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="message" data-message-id=${message.id}>
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
          `<div class="message" data-message-id=${message.id}>
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
    console.log("test2");
    var html = buildHTML(data);
    $('.messages').append(html);
    $('form')[0].reset();
    $('.chat-main__chats').animate({ scrollTop: $('.chat-main__chats')[0].scrollHeight});
    // $('.submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  })
  .always(function(){
    $('.submit-btn').prop('disabled', false);
  })
})

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


