jQuery(function ($){
    let _body = $("body");

    // Work on post type sfwd-courses
    if ( _body.hasClass("sfwd-courses") ){
        let target = $(".ld__builder--content .row-actions.-right");
        let a = [];
        if ( target.length ){
            target.each(function (){
                let _h = $(this);
                let getPathElm = _h.find(".edit").children("a");
                let getPathEl = _h.children(".edit");
                let getPath = getPathElm.attr('href');
                let loadingHtml = '<div class="tb-loading-spinner">\n' +
                    '  <div class="rect1"></div>\n' +
                    '  <div class="rect2"></div>\n' +
                    '  <div class="rect3"></div>\n' +
                    '  <div class="rect4"></div>\n' +
                    '  <div class="rect5"></div>\n' +
                    '</div>';
                jQuery( loadingHtml ).insertBefore( getPathEl );
                a.push(getUrlVars( getPath )["post"]);
                _h.children("span").hide();
            });
            tbRequestViewPostUrl( a, target )
        }
    }

    // Work on sfwd-question
    if( _body.hasClass( "sfwd-question" ) ){
        let tbPTitle = $( "#sfwd-header .ld-global-header-title-area h1" );
        let tbqAddAnsBtn = $( "input.addAnswer" );
        let tbPTitleHtml = tbPTitle.text() + "<span id='tb-qs-page-title-edit-btn' class=\"dashicons dashicons-edit\"></span>";
        tbPTitle.html( tbPTitleHtml );
        tbqAddAnsBtn.val( "Add answer" );

        // Check wpProQuiz_answerPoints
        let tbAddAp = $(".wpProQuiz_answerPoints");
        tbAddAp.each(function (){
            let _handler = $(this);
            if ( _handler.css( 'display' ) === 'none' ){
                _handler.parents("td").width(0)
            }
        });
    }

    // Work on sfwd-quiz
    if( _body.hasClass( "sfwd-quiz" ) ){
        let qBtn = $( ".ld-node-header button.ld-button-reset" );
        let qActionArea = $( ".ld-node-header .ld-node-header__quiz-actions" );
        $( "<div class='over-layer'></div>" ).insertBefore( qBtn.parent("span") );
        $( "<div class='over-layer'></div>" ).insertBefore( qActionArea.children(".select-question-type") );
    }
});

function getUrlVars( url ){
    let vars = [], hash;
    let hashes = url.slice(window.location.href.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function tbRequestViewPostUrl( data, elem ){
    let formData = { 'action': 'learndash_builder_view_page', 'data' : data };
    jQuery.post( tbBuilderPage.ajaxurl, formData, function ( response ){
        let data = JSON.parse(response);
        if ( data.status === 'success' ){
            elem.each( function ( index, value ){
                let handler = jQuery(this);
                let url = data.msg[index];

                let getPathElm = handler.children(".edit");
                let loader = handler.children(".tb-loading-spinner");
                let elmChildren = handler.children("span");

                let html = '<span class="view"><a href="'+ url +'" target="_blank">View</a> | </span>';
                let htmlToggleBtn = '<div class="tb-ld-button-reset ld-button-reset toggle -expanded">'+ handler.next('button').html() +'</div>';
                loader.hide();
                elmChildren.show();
                jQuery( html ).insertBefore( getPathElm );
                if ( handler.parents( 'div.ld__builder--child' ).length ){
                    jQuery( htmlToggleBtn ).insertAfter( handler.next('button') );
                }
            });
        }
    });
}

jQuery(document).on("click",".sfwd-courses .tb-ld-button-reset",function (){
    let handler = jQuery(this);
    let target = handler.parent("div.ld-node-header").next("div.ld__builder--grandchild");

    if ( handler.hasClass("-expanded") ){
        target.slideUp();
        handler.removeClass("-expanded");
    }else{
        target.slideDown();
        handler.addClass("-expanded");
    }
});

jQuery(document).on("click",".sfwd-question #tb-qs-page-title-edit-btn",function (){
    let handler = jQuery(this);
    let target = jQuery(".sfwd-question #titlediv");

    if ( handler.hasClass("-expanded") ){
        target.slideUp();
        handler.removeClass("-expanded");
    }else{
        target.slideDown();
        handler.addClass("-expanded");
    }
});

jQuery(document).on("click",".sfwd-question .tbq-deleteAnswer-btn",function (){
    let handler = jQuery(this);
    let target = handler.parents("table").next("input.deleteAnswer");
    target.trigger('click');
});

jQuery(document).on("click",".sfwd-quiz .ld-node-header .ld-button-reset",function (){
    setTimeout(function (){
        let qActionArea = jQuery( ".ld-node-header .ld-node-header__quiz-actions" );
        let _html = "<div class='over-layer'></div>";
        jQuery( _html ).insertBefore( qActionArea.children(".select-question-type") );
        jQuery( _html ).insertBefore( jQuery(".ld__builder--question-content button") );
        jQuery( _html ).insertBefore( jQuery(".ld-question-answers-list li .ld-button-reset") );
    },1000);
});