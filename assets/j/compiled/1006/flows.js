var dialogs={},activeAnchor;
$(document).ready(function(){dialogs.add=$("#dAddFlow").dialog({width:340,buttons:{OK:function(){$("button",this).attr("disabled","disabled");$.ajax({url:$("#dAddFlow form").attr("action"),data:{name:$("#dAddFlow input[name=name]").val()},success:function(a){if(!a.error){document.location=a.url;$("#dAddFlow .error").hide();return $("#dAddFlow").dialog("close")}$("#dAddFlow .error").text(a.message).show()},type:"POST",dataType:"json"})},Cancel:function(){$(this).dialog("close")}}});dialogs["delete"]=
$("#dDeleteFlow").dialog({width:480,buttons:{Delete:function(){var a=this;$.ajax({url:$(activeAnchor).attr("href"),type:"DELETE",success:function(b){if(!b.error){$.notify("Flow has been deleted");$(activeAnchor).parents("tr").fadeOut("fast");$(a).dialog("close")}},dataType:"json"})},Cancel:function(){$(this).dialog("close")}}});dialogs.copy=$("#dCopyFlow").dialog({width:640,buttons:{OK:function(){$("form",this).submit()},Cancel:function(){$(this).dialog("close")}}});dialogs.add.closest(".ui-dialog").addClass("add");
dialogs.copy.closest(".ui-dialog").addClass("manage");dialogs["delete"].closest(".ui-dialog").addClass("display");$(".add-flow").click(function(a){a.preventDefault();dialogs.add.dialog("open")});$("a.trash").click(function(a){a.preventDefault();activeAnchor=this;dialogs["delete"].dialog("open")});$("a.copy").click(function(a){a.preventDefault();a=$(this).closest("tr");a=$(".col_0",a).text();dialogs.copy.dialog("open");$("form",dialogs.copy).attr("action",this.href);$(":text",dialogs.copy).focus().val(a+
" copy")});$(".flow-name-display").live("click",function(a){a.stopPropagation();$(this).hide().siblings(".flow-name-edit").show()});$(".flow-name-edit-cancel").live("click",function(a){a.preventDefault();a.stopPropagation();a=$(this).siblings('input[name="flow_name"]');a.val(a.attr("data-orig-value")).closest("span").hide().siblings(".flow-name-display").show()});$(".flow-name-edit button.submit-button").live("click",function(a){a.stopPropagation();a.preventDefault();var b=$(this);b.attr("disabled",
"disabled");var c=b.siblings('input[name="flow_name"]').val();b.addClass("disabled");$.post(b.attr("data-action"),{name:c},function(d){b.removeClass("disabled");if(d.error)$.notify("There was an error updating the Flow: "+d.message);else{$.notify("Flow name has been updated.");$("tr#flow-"+d.flow_id).find('input[name="flow_name"]').attr("data-orig-value",c).closest("span").hide().siblings(".flow-name-display").text(c).show()}b.attr("disabled",false)},"json")})});