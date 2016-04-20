console.log("index start running");
$(document).ready(function(){
	/*function define*/
	var A = function(){
		$(".widget .toolbar .widget-collapse").click(function(){
			var A = $(this).parents(".widget");
			var x = A.children(".widget-content");
			if(A.hasClass("widget-closed")){
				$(this).children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
				x.slideDown(200, function(){
					A.removeClass("widget-closed");
				});
			}else{
				$(this).children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
				x.slideUp(200, function(){
					A.addClass("widget-closed");
				});
			}
		});
		
		$("legend .toolbar .fieldset-collapse").click(function(){
			var A = $(this).parents("fieldset");
			var B = $(this).parents("legend");
			var x = B.next();
			if(A.hasClass("fieldset-closed")){
				$(this).children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
				x.slideDown(200, function(){
					A.removeClass("fieldset-closed");
				});
			}else{
				$(this).children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
				x.slideUp(200, function(){
					A.addClass("fieldset-closed");
				});
			}
		});
	};
	
	var B = function(){
		$(".table-checkable thead th.checkbox-column :checkbox").on("change", function(){
			var z = $(this).prop("checked");
			var x = $(this).parents("table.table-checkable").data("horizontalWidth");
			if (typeof x != "undefined") {
		        var y = $(this).parents(".dataTables_scroll").find(".dataTables_scrollBody tbody");
		    } else {
		        var y = $(this).parents("table").children("tbody");
		    }
			y.each(function(B, A){
				$(A).find(".checkbox-column").each(function(D, C){
					var E = $(":checkbox:not(:disabled)", $(C)).prop("checked", z).trigger("change");
					if (E.hasClass("uniform")) {
			            $.uniform.update(E);
			        }
				});
			});
		});
		
		$(".table-checkable tbody tr td.checkbox-column :checkbox").on("change", function(){
			var x = $(this).prop("checked");
			$(this).closest("tr").toggleClass("checked", x);
		});
		
	};
	
	var D = function(){
		$(".table-radio tbody tr td.checkbox-column :radio").on("click", function(){
			var that = this;
			var x = $(that).closest("tr")[0];
			$(x).addClass("checked");
			var y = $(that).parents("table.table-radio").children("tbody");
			y.each(function(B, A){
				$(A).find("tr:not(.disabled)").not(x).removeClass("checked");
				$(A).find(".checkbox-column :radio:not(:disabled)").not(that).prop("checked", false);
			});
		});
	};
	
	var C = function(){
		var A = $(".FixedPositionBox");
		if(A.size() > 0){
			
			var init_outerHeight = A.outerHeight();
			var init_outerWidth = A.outerWidth();
			var init_offsetTop = A.offset().top;
			var x = init_outerHeight + 35;
			
			$(window).scroll(function(){
				
				var windowsize = $(window).width();
				var bottomHeight = document.querySelector(".FixedBoxBottom").getBoundingClientRect().top;
				
				if(windowsize > 768){
					if($(window).scrollTop() > init_offsetTop && bottomHeight > x){
						A.css("position", "fixed");
						A.css("width", init_outerWidth);
						A.css("top", "10px");	
					}else if($(window).scrollTop() > init_offsetTop && bottomHeight <= x){
						var bottomDistance = $(".FixedBoxBottom").offset().top;
						A.css("position", "absolute");
						A.css("width", init_outerWidth);
						A.css("height", init_outerHeight);
						A.css("top", bottomDistance - init_offsetTop - init_outerHeight - 25);
					}else{
						A.css("position", "static");
						A.css("width", "auto");
						A.css("height", "auto");
					}
				}
			});
			
			$(window).resize(function(){
				
				var windowsize = $(window).width();
				
				if(windowsize < 768){
					A.css("position", "static");
					A.css("width", "auto");
					A.css("height", "auto");
				}
			});
		}
	};
	
	var E = function(){
		$("[data-popup-type='listFund']").on("click", function(){
			var that = this;
			window.returnFundCode=$(that).parent().prev();
			window.returnFundName=$(that).parent().prev().val();
			window.open('MFFundPopup.html','Fund','alwaysRaised=yes,resizable=no,location=no,top=100,left=70,width=780,height=540');
		});
	};
	
	/*plug-in bind*/
	
	if($.fn.dataTable){
		custom_Tables();
		$(document.querySelectorAll(".datatable thead th:first-child")).removeClass("sorting_asc").addClass("sorting_disabled");
		
		/*special handle for MFExclusiveFund [Add To List] && [Remove]*/
		$("#addaccount").click(function(){
			var shtml = "<td class='checkbox-column'><input type='checkbox'></td><td>" + $("#addaccountsrc01").val() + "</td>";
			var oTrElement = document.createElement("tr"); 
			oTrElement.innerHTML = shtml;
			$("#accountlisttarget").data("dtEditer").api().row.add(oTrElement).draw(false);
			$("#accountlisttarget").find("thead tr th:first").removeClass("sorting_asc").addClass("sorting_disabled");
		});
		$("#removeaccount").click(function(){
			var arrCheckedBoxes = document.querySelectorAll("#accountlisttarget tbody tr td:first-child input:checked");
			for(var i=0; i<arrCheckedBoxes.length; i++){
				$("#accountlisttarget").data("dtEditer").api().rows(arrCheckedBoxes[i].parentNode.parentNode).remove().draw(false);
			}
			$("#accountlisttarget").find("thead tr th:first").removeClass("sorting_asc").addClass("sorting_disabled");
		});
		
	}
	
	if($.fn.datepicker){
		$(".datepickerHandle").datepicker();
	}
	
	$("select#transactiontype").change(function(event){
		var tranType = $(this).val().substring(0, 3);
		if(tranType && tranType === "Red"){
			$("body").removeClass("bluestyle").removeClass("goldstyle").removeClass("blackstyle").addClass("bluestyle");
		}else if(tranType && tranType === "Sub"){
			$("body").removeClass("bluestyle").removeClass("goldstyle").removeClass("blackstyle").addClass("goldstyle");
		}else if(tranType && tranType === "Swi"){
			$("body").removeClass("bluestyle").removeClass("goldstyle").removeClass("blackstyle").addClass("blackstyle");
		}else{
			console.log("tran type error");
		}
	});
	
	if($.fn.selectmenu){
		$(document.querySelectorAll("select:not(.selectmenuExclude)")).selectmenu({
			change: function( event, ui ){
				$(this).trigger("change");
			}
		});
	}
	
	if($.configureBoxes){
		$.configureBoxes();
	}
	
	if($.fn.floatThead){
		var fixTableHeaderArray = $("table.table-floatThead"); 
		fixTableHeaderArray.floatThead({
			scrollContainer: function(fixTableHeaderArray){
				return fixTableHeaderArray.closest(".table-floatThead-wrapper");
			}
		});
		fixTableHeaderArray.trigger('reflow');
	}
	
	/*function run phase*/
	A();
	B();
	C();
	D();
	E();
	
	$("#MessagePopup").modal({backdrop: 'static'});
});

console.log("index end ");
