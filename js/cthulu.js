$(document).ready(function(){
                  
                                    
    $(".3d6rich").click(function(){
                        
        var r = random(3, 18, 0);
        var input = prevInput($(this));
        csv("rich.csv", r, 1, input);
                        
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
                     
                     $("#edu20").val(value * 20);
        
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
    
    if (2<= value && value <= 12) {
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

