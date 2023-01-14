let travel

$(document).ready(function(){
  travelApi()

})
function travelApi(){
  $.ajax({
    type: 'GET',
    url: 'https://soa.tainan.gov.tw/Api/Service/Get/5767e748-f68b-4b96-809a-19d68c0d450a',
    success: function (res) {
      travel = res.data;
      result()

    }
  });
}

function result(){

  for (let i = 0; i < travel.length; i ++){
    $('#result').html(
      $('#result').html() +
      `   
        <div class="card card-info" style="width: 18rem;">
          <img src="${travel[i]["照片連結網址1[提供無版權爭議且可對外流通供應之照片，以讓加值業者可透過本網址連結使用]"]}" class="card-img-top" alt="南鯤鯓代天府山門大牌樓">
          <div class="card-body">
            <h3 class="card-title">${travel[i]["景點中文名稱"]}</h3>
            <h5>${travel[i]["景點英文名稱"]}</h5>
            <div class="info-wrap">  
              <a href="#" class="btn btn-outline-primary detail-button" id=${travel[i].Seq}>更多</a>
             </div> 
          </div>
        </div>
      `
    )
  }
  $('.detail-button').click(function () {
    location.href = 'detail.html?id=' + $(this).attr('id')
  })


}


