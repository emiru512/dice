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
          var value = csvList[i][1];
          var name = csvList[i][0];
          $(".skill").append($('<option>').attr({ value: name }).text(name));
          // id(#name)要素をくわえる？
        }
    });
  
    // 最初の行を複製
    $("#table_skill > tbody > tr:first").clone(true).appendTo(
                                                             $("#table_skill > tbody")
                                                             );
                  
    $(".skill").change(function(){
       
       var defaultInput = nextInput($(this));
        var skillName = $(this).val();
        csv("skill.csv", skillName, 1, defaultInput);
                       
    });
                  
    $(".skill_occupationpoint").change(function(){
                                       
       var occupationPoint = parseInt($(this).val(), 10);
                                       
        var interestingInput = $(this).parent().parent().find(".skill_interestingpoint");
        var interestingPoint = parseInt(interestingInput.val(), 10);
                                        
        var defaultInput = $(this).parent().parent().find(".skill_defaultpoint");
        var defaultPoint = parseInt(defaultInput.val(), 10);
                                       
        if (isNaN(interestingPoint)) { interestingPoint = 0; }
        if (isNaN(occupationPoint)) { occupationPoint = 0; }
        if (isNaN(defaultPoint)) { defaultPoint = 0; }
                                       
        var sum = interestingPoint + occupationPoint + defaultPoint;

        var label = $(this).parent().parent().find(".skill_sum");
        label.text(sum);

    });
                  
    $(".skill_interestingpoint").change(function(){
                                      
        var interestingPoint = parseInt($(this).val(), 10);
                                        
        var occupationInput = $(this).parent().parent().find(".skill_occupationpoint");
        var occupationPoint = parseInt(occupationInput.val(), 10);
                                        
        var defaultInput = $(this).parent().parent().find(".skill_defaultpoint");
        var defaultPoint = parseInt(defaultInput.val(), 10);
                                        
        if (isNaN(interestingPoint)) { interestingPoint = 0; }
        if (isNaN(occupationPoint)) { occupationPoint = 0; }
        if (isNaN(defaultPoint)) { defaultPoint = 0; }
                                        
        var sum = interestingPoint + occupationPoint + defaultPoint;

        var label = $(this).parent().parent().find(".skill_sum");
        label.text(sum);
                                      
    });
                  
    $(".3d6rich").click(function(){
                        
        var r = random(3, 18, 0);
        var input = prevInput($(this));
        csv("rich.csv", r, 1, input);
                        
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
                     
                     $("#int10").val(value * 10);
                    
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
                     
                     $("#occupationpoint").val(value * 20);
        
    });

      $("#con").change(function(){
                       
                       $("#hp").val(calcHP());
                       
                       });
      
      $("#siz").change(function(){
                       
           $("#hp").val(calcHP());
            $("#db").val(calcDB());
                       
       });
                
                  
      $("#str").change(function(){
                       
                       $("#db").val(calcDB());
                       
                       });
                  
      $(".shortinsanity").click(function(){
                          
              var r = random(1, 10, 0);
              var input = prevInput($(this));
              csv("shortinsanity.csv", r, 1, input);
              
              });
                  
      $(".longinsanity").click(function(){
                                
            var r = random(1, 10, 0);
            var input = prevInput($(this));
            csv("longinsanity.csv", r, 1, input);
            
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
    
    if (2 <= value && value <= 12) {
        return "-1D6";
    } else if (value <= 16) {
        return "-1D4";
    } else if (value <= 24) {
        return "+-0";
    } else if (value <= 32) {
        return "+1D4";
    } else if (value <= 40) {
        return "+1D6";
    } else if (value <= 56) {
        return "+2D6";
    } else if (value <= 72) {
        return "3D6";
    } else {
        return "";
    }
    

}

