$(document).ready(function(){

    // 職業リストを追加
    $.get("occupation.csv", function(data){
        var csvList = $.csv()(data);
        for (var i = 1; i < csvList.length ; i++) {
          // i=行 0=列
          var value = csvList[i][1];
          var name = csvList[i][0];
          $("#occupation").append($('<option>').attr({ value: value }).text(name));
        }
    });
                  
    // 技能リストを追加
    $.get("skill.csv", function(data){
        var csvList = $.csv()(data);
        for (var i = 1; i < csvList.length ; i++) {
          // i=行 0=列
          
          var name = csvList[i][0];
          var id = csvList[i][1];
          var value = csvList[i][2];
          // $(".skill").append($('<option>').attr({ value: name }).text(name));
          
          var careerpointID = id + "_careerpoint";
          var pipointID = id + "_pipoint";
          
          $("#table_skill > tbody").append('<tr>' +
                                           '<td>' +
                                           name +
                                           '</td>' +
                                           
                                           '<td><input class="skill_defaultpoint form-control" type="text" value="' + value + '" /></td>' +
                                           '<td><input id="skill_' + careerpointID + '" class="skill_careerpoint form-control" type="text" /></td>' +
                                           '<td><input id="skill_' + pipointID + '" class="skill_pipoint form-control" type="text" /></td>' +
                                           '<td><label class="skill_sum"></label></td>' +
                                           
                                           '</tr>');
          $("#table_skill > tbody").trigger("create", true);
          
          // リストにして、id(#name)要素をくわえる
          // さらに保存リストにid要素を加える
          parameterLabels.push(careerpointID);
          parameterLabels.push(pipointID);
          
        }
    });
                  
    $(".skill").change(function(){
       
       var defaultInput = nextInput($(this));
        var skillName = $(this).val();
        csv("skill.csv", skillName, 1, defaultInput);
                       
    });
                  
    // $(".skill_careerpoint").change(function(){
    $(document).on("change", ".skill_careerpoint", function() {
                                   
       var careerpoint = parseInt($(this).val(), 10);
                                       
        var interestingInput = $(this).parent().parent().find(".skill_pipoint");
        var pipoint = parseInt(interestingInput.val(), 10);
                                        
        var defaultInput = $(this).parent().parent().find(".skill_defaultpoint");
        var defaultPoint = parseInt(defaultInput.val(), 10);
                                       
        if (isNaN(pipoint)) { pipoint = 0; }
        if (isNaN(careerpoint)) { careerpoint = 0; }
        if (isNaN(defaultPoint)) { defaultPoint = 0; }
                                       
        var sum = pipoint + careerpoint + defaultPoint;

        var label = $(this).parent().parent().find(".skill_sum");
        label.text(sum);

    });
                  
    // $(".skill_pipoint").change(function(){
  $(document).on("change", ".skill_pipoint", function() {
                 
        var pipoint = parseInt($(this).val(), 10);
                                        
        var occupationInput = $(this).parent().parent().find(".skill_careerpoint");
        var careerpoint = parseInt(occupationInput.val(), 10);
                                        
        var defaultInput = $(this).parent().parent().find(".skill_defaultpoint");
        var defaultPoint = parseInt(defaultInput.val(), 10);
                                        
        if (isNaN(pipoint)) { pipoint = 0; }
        if (isNaN(careerpoint)) { careerpoint = 0; }
        if (isNaN(defaultPoint)) { defaultPoint = 0; }
                                        
        var sum = pipoint + careerpoint + defaultPoint;

        var label = $(this).parent().parent().find(".skill_sum");
        label.text(sum);
                                      
    });
                  
    $(".3d6rich").click(function(){
                        
        var r = random(3, 18, 0);
        var input = prevInput($(this));
        csv("rich.csv", r, 1, input, true);
                        
    });
                  
    $(".2d6p6siz").click(function(){
                       
       var r = random(2, 12, 6);
        var input = prevInput($(this));
        csv("siz.csv", r, 1, input, true);
        
    });
                  
    $(".1d10p4").click(function(){
                      
                      var r = random(1, 10, 4);
                      var input = prevInput($(this));
                       input.val(r).trigger("change", true);
                      
                      });
                  
    $(".1d10m10").click(function(){
                     
         var r = random(1, 10, 0);
         var input = prevInput($(this));
         input.val(r * 10);
         
         });

    $("#int").change(function(){
                    
        var value = $(this).val();
        $("#idea").val(value * 5);
                     
                     $("#pipoint").val(value * 10);
                    
    });
                  
    $("#pow").change(function(){
       
       var value = $(this).val();
       $("#san").val(value * 5);
        $("#luck").val(value * 5);
                     
        $("#mp").val(value);
       
    });
                  
    $("#edu").change(function(){
                     
        var value = $(this).val();
        $("#knowledge").val(value * 5);
                     
                     $("#careerpoint").val(value * 20);
        
    });

      $("#con").change(function(){
                       
                       $("#hp").val(calcHP());
                       
                       });
      
      $("#siz").change(function(){
                       
           $("#hp").val(calcHP());
                       calcDB();
                       
       });
                
                  
      $("#str").change(function(){
                       
                       calcDB();
                       
                       });
                  
      $(".shortinsanity").click(function(){
                          
              var r = random(1, 10, 0);
              var input = prevInput($(this));
              csv("shortinsanity.csv", r, 1, input, true);
              
              });
                  
      $(".longinsanity").click(function(){
                                
            var r = random(1, 10, 0);
            var input = prevInput($(this));
            csv("longinsanity.csv", r, 1, input, true);
            
        });
                  
});

function calcHP() {
    
    var con = parseInt($("#con").val(), 10);
    var siz = parseInt($("#siz").val(), 10);
    
    return Math.ceil(con + siz / 2);
}

function calcDB() {

    var str = parseInt($("#str").val(), 10);
    var siz = parseInt($("#siz").val(), 10);
    
    var value = str + siz;
    var input = $("#db");
    
    csv("db.csv", value, 1, input);
    
}

