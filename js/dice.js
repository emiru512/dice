// $(function() {

// m-n+xの乱数を生成して返却する
function random (first, last, x) {
    // 0-15 + 3 -> 1-16 + 2
    var random = Math.floor(Math.random() * (last - first + 1)) + first;
    random += x;
    
    return random;
    
};

// 外部csvを読み込み、ダイス目(1列目固定)にそったデータ(2列目以降)をinputにセットする
function csv (filename, dice, column, input) {
    
    var result;
    
    $.get(filename, function(data){
          var csvList = $.csv()(data);
          for (var i = 1; i < csvList.length ; i++) {
          // i=行 0=列
          
          
          if (dice == csvList[i][0]) {
          result = csvList[i][column];
          input.val(result);
          
          break;
          }
          }
          });
};

// 1つ前のinputを取得する
function prevInput (button) {
    var input = $(button).parent().prev().children("input");
    return input;
};

// 1つ前のラベルを取得する
function prevLabel (input) {
    var label = $(input).parent().prev().children("label");
    return label;
};

$(document).ready(function(){
                  
  // 初期設定
  $("input").addClass("form-control");
  $("textarea").addClass("form-control");
  $("button").addClass("btn btn-primary btn-embossed");
  

  // プレースホルダの設定
  for (var i = 0; i < parameterLabels.length ; i++) {
      var identifier = parameterLabels[i];
      var input = $("#" + identifier);
      var label = prevLabel(input);
      var labeltext = label.text().replace(':', '');
                  
                  
      input.attr('placeholder',labeltext);
    
  }

                  $(".save").click(function(){
                                   
                                   // キャラクターオブジェクトを作成
                                   var data = new Object();
                                   
                                   // ゲームタイプ
                                   data.gametype = gametype;
                                   
                                   // データをフォームから読む
                                   for (var i = 0; i < parameterLabels.length ; i++) {
                                   var label = parameterLabels[i];
                                   data[label] = $("#" + label).val();
                                   }
                                   
                                   var json = $.stringify(data);
                                   
                                   $("#jsontextarea").val(json);
                                   
                                   
                                   // HTML5 File APIに対応しているブラウザのみ動作
                                   // ダウンロード用データの作成
                                   
                                   // 指定されたデータを保持するBlobを作成する
                                   var blob = new Blob([ json ], { "type" : "text/plain" });
                                   
                                   // href属性にBlobオブジェクトを設定する
                                   window.URL = window.URL || window.webkitURL;
                                   $("#download").attr("href", window.URL.createObjectURL(blob));
                                   
                                   
                                   });
                  
                  $(".load").click(function(){
                                   
                                   // フォームにデータを反映
                                   var json = $("#jsontextarea").val();
                                   
                                   var character = $.parseJSON(json);
                                   
                                   for (var i = 0; i < parameterLabels.length ; i++) {
                                   var label = parameterLabels[i];
                                    $("#" + label).val(character[label]).trigger("change",true);
                                   }
                                   
                                   });
                  
                  
                  
                  $(".triggerallrandom").click(function(){
                                               
                       // 自分以外の兄弟要素の孫要素("button"でフィルタ)を取得し
                       // それらのclickイベントを発火させる
                       $(this).siblings().find("button").trigger("click",true);
                       
                       });
                  
                  $(".1d100").click(function(){
                                  var input = prevInput($(this));
                                  input.val(random(1, 100, 0)).trigger("change",true);
                                  });
                  
                  $(".1d3").click(function(){
                                    var input = prevInput($(this));
                                    input.val(random(1, 3, 0)).trigger("change",true);
                                    });
                  
                  $(".1d4").click(function(){
                                    var input = prevInput($(this));
                                    input.val(random(1, 4, 0)).trigger("change",true);
                                    });
                  
                  $(".1d6").click(function(){
                                  var input = prevInput($(this));
                                  input.val(random(1, 6, 0)).trigger("change",true);
                                  });
                  
                  $(".1d10").click(function(){
                                  var input = prevInput($(this));
                                  input.val(random(1, 10, 0)).trigger("change",true);
                                  });
                  
                  $(".1d20").click(function(){
                                   var input = prevInput($(this));
                                   input.val(random(1, 20, 0)).trigger("change",true);
                                   });
                  
                  $(".2d3").click(function(){
                                    var input = prevInput($(this));
                                    input.val(random(1, 6, 0)).trigger("change",true);
                                    });
                  
                  $(".2d4").click(function(){
                                  var input = prevInput($(this));
                                  input.val(random(1, 8, 0)).trigger("change",true);
                                  });
                  
                  $(".2d6").click(function(){
                                  var input = prevInput($(this));
                                  input.val(random(2, 12, 0)).trigger("change",true);
                                  });
                  
                  $(".3d6").click(function(){
                                  var input = prevInput($(this));
                                  input.val(random(3, 18, 0)).trigger("change",true);
                                  });
                  
                  $(".2d6p6").click(function(){
                                    prevInput($(this)).val(random(2, 12, 6)).trigger("change",true);
                                    });
                  
                  $(".3d6p3").click(function(){
                                    prevInput($(this)).val(random(3, 18, 3)).trigger("change",true);
                                    });
                  
                  $(".add").click(function(){
                                  var input = prevInput($(this));
                                  var value = parseInt(input.val(), 10);
                                  value ++;
                                   input.val(value).trigger("change",true);
                                   });
                  
                  $(".subtract").click(function(){
                                  var input = prevInput($(this));
                                  var value = parseInt(input.val(), 10);
                                  value --;
                                  input.val(value).trigger("change",true);
                                  });

                  
                  
 });
  
