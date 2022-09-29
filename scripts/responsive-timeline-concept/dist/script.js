$(document).on('keydown', ( e ) => {
    if (e.code == "KeyT") {
        tFunction()
    }
    if (e.code == "KeyE") {
        eFunction()
    }
    if (e.code == "KeyG") {
        gFunction()
    }
    if (e.code == "KeyR") {
        rFunction()
    }
    if (e.code == "KeyC") {
        cFunction()
    }
})

function removeEmpty() {
    let deleteMe = true
   $('.box-content').children().each(function() {
         if ($(this).text().trim().length > 0) {
            console.log($(this) +" is empty")
              deleteMe = false             
         }

         if (deleteMe == true) {
            console.log("deleteMe")
            $('.box-content').parent().parent().css('visibility', 'hidden')
            }
    })
}


/*tFunction (displays tlp & eng_tlp, hides rest) */
function tFunction() {
    $('.eng').hide()
    $('.pt').hide()
    $('.eng_pt').hide()
    $('.deu').hide()
    $('.tlp_deu').hide()
    $('.pt_deu').hide()

    $('.tlp').show()
    $('.eng_tlp').show()

   
    $('.NBalmostequalsTLP').css('background', 'yellow')
    $('.NBlikeTLP').css('background', 'lightgrey')
    $('.NBequalsTLP').css('background', 'lightgreen')
}

/*eFunction (displays eng, hides rest) */
function eFunction() {
    $('.tlp').hide()
    $('.pt').hide()
    $('.eng_pt').hide()
    $('.eng_tlp').hide()
    $('.deu').hide()
    $('.tlp_deu').hide()
    $('.pt_deu').hide()

    $('.eng').show()

    $('.NBalmostequalsTLP').css('background', 'none')
    $('.NBlikeTLP').css('background', 'none')
    $('.NBequalsTLP').css('background', 'none')
}

/*dFunction (displays deu, hides rest) */
function gFunction() {
    $('.eng').hide()
    $('.tlp').hide()
    $('.pt').hide()
    $('.eng_pt').hide()
    $('.eng_tlp').hide()
    $('.tlp_deu').hide()
    $('.pt_deu').hide()

    $('.deu').show()

    $('.NBalmostequalsTLP').css('background', 'none')
    $('.NBlikeTLP').css('background', 'none')
    $('.NBequalsTLP').css('background', 'none')   
}

/*rFunction (displays pt & eng_pt, hides rest) */
function rFunction() {
    $('.eng').hide()
    $('.tlp').hide()
    $('.eng_tlp').hide()
    $('.deu').hide()
    $('.tlp_deu').hide()
    $('.pt_deu').hide()

    $('.pt').show()
    $('.eng_pt').show()

    $('.NBalmostequalsTLP').css('background', 'none')
    $('.NBlikeTLP').css('background', 'none')
    $('.NBequalsTLP').css('background', 'none')
}

/*cFunction (displays tlp_deu & .recto .deu, hides rest) */
function cFunction() {
    $(".verso").show()
    $('.eng').hide()
    $('.tlp').hide()
    $('.pt').hide()
    $('.eng_pt').hide()
    $('.eng_tlp').hide()
    $('.deu').hide()
    $('.pt_deu').hide()

    $('.tlp_deu').show()
    $('.recto .deu').show()

    $('.NBalmostequalsTLP').css('background', 'none')
    $('.NBlikeTLP').css('background', 'none')
    $('.NBequalsTLP').css('background', 'none')
}

removeEmpty()


/* 
    $(".tlp_deu").each(function() {
        if ($(this).text().length == 0) {
            //$(this).parent().parent().parent().css('visibility', 'hidden');
            $(this).parent().parent().parent().css('visibility', 'hidden');
            $(this).parent().parent().parent().parent().parent().find('.timeline-date').css('visibility', 'hidden');
            $(this).parent().parent().parent().parent().parent().find('.bead').css('visibility', 'hidden');
        }
    })

    $(".tlp_deu").each(function() {
        if ($(this).text().length == 0) {
            let id = $(this).data("parent")
            if (id !== "") {
                $("#" + id).css('visibility', 'hidden')
                //$("#" + id).parent().parent().find('.timeline-date').css('visibility', 'hidden')
            }           
        }        
    })
*/