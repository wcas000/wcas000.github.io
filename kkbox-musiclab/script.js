
$(document).ready(function () {
  showResultByKkboxApi('maroon5');
  $('.searchBt').click(function () {
    showResultByKkboxApi($('.searchInput').val());
  })
});
function showResultByKkboxApi(searchKey) {
  $('.songs').remove();
  var settings = {
    "url": `https://api.kkbox.com/v1.1/search?q=${searchKey}&type=track&territory=TW`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer Sfvj8FUW237PUmtMe40phw=="
    },
  };
  showLoading()
  $.ajax(settings).done(function (response) {
    hideLoading()
    let data = response.tracks.data;
    let idList = []
    for (let i = 0; i < data.length; i++) {
      if (idList.includes(data[i].album.id) === false) {
        idList.push(data[i].album.id)

      }
    }
    for (let x = 0; x < idList.length; x++) {
      $('#albumList').append(        
        `
      <iframe class="songs" src="https://widget.kkbox.com/v1/?id=${idList[x]}&type=album&terr=TW&lang=en"></iframe>
      `
      )
    }
  });
}
