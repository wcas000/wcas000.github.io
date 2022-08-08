let detailInfo
let url_str = location.href;
let url = new URL(url_str);
let search_params = url.searchParams;


$(document).ready(function () {
  travelApi()

})
function travelApi() {
  showLoading()
  $.ajax({
    type: 'GET',
    url: 'https://soa.tainan.gov.tw/Api/Service/Get/5767e748-f68b-4b96-809a-19d68c0d450a',
    success: function (res) {
      hideLoading()
      travel = res.data;
      detailInfo = travel.filter(x => x.Seq == search_params.get('id'));

      detail();
    }
  });
}
function detail() {
  // 景點相關資訊
  $('#title').text(detailInfo[0]["景點中文名稱"]);
  $('#fbLink').attr('href', detailInfo[0]["臉書粉專連結（選填）"]);
  $('#mapLink').attr('href', detailInfo[0]["地圖服務連結（選填）(GoogleMap,Bing等) "]);
  $('#img1').attr('src', detailInfo[0]["照片連結網址1（提供無版權爭議且可對外流通供應之照片，以讓加值業者可透過本網址連結使用）"]);
  $('#imginfo1').text(detailInfo[0]["照片中文說明1（照片連結網址1之文字說明）"]);
  $('#img2').attr('src', detailInfo[0]["照片連結網址2（選填）（提供無版權爭議且可對外流通供應之照片，以讓加值業者可透過本網址連結使用）"]);
  $('#imginfo2').text(detailInfo[0]["照片中文說明2（選填）（照片連結網址2之文字說明）"]);
  $('#description').text(detailInfo[0]["景點特色精簡版文字簡述（中文）"]);
  $('#address').text(detailInfo[0]["景點中文地址，未具地址則填註景點名稱，旅服中心或單位主管機關住址或可資識別之概略地段描述（但座標仍定位在點位置）"]);
  $('#telephone').text(detailInfo[0]["景點服務電話，若該景點未具電話則應填註旅服中心及單位主管機關電話"]);
  $('#website').attr('href', detailInfo[0]["網址（選填）（該景點之官方網站連結網址）"]);
  $('#website').text(detailInfo[0]["網址（選填）（該景點之官方網站連結網址）"]);

  // 開放時間轉換及當日時間顏色
  let openingArrApi = detailInfo[0]["開放時間"].split('/');
  let openingArr = $.grep(openingArrApi, function(value) { return value !== '' })
  for (let i = 0; i < openingArr.length; i++) {   
    $('#opening').html(
      $('#opening').html() +
    `
    <div id="date" name="today"><span>${ getWeekText(i) }</span>${openingArr[i]}</div>
    `
    )
  }
  $("[name='today']").eq(new Date().getDay()).addClass('today-color');

  // 
  if ($('#fbLink').attr('href') === "") {
    $('#fbList').remove()
  }
  if ($('#website').attr('href') === "") {
    $('#webList').remove()
  }

}



function showLoading() {
  $('.loading').show();
}
function hideLoading() {
  $('.loading').hide();
}
function getWeekText(x) {
  if (x == 0) {
    return '星期日: '
  } else if (x == 1) {
    return '星期一: '
  } else if (x == 2) {
    return '星期二: '
  } else if (x == 3) {
    return '星期三: '
  } else if (x == 4) {
    return '星期四: '
  } else if (x == 5) {
    return '星期五: ' 
  } else if (x == 6) {
    return '星期六: '
  }
}
