// 코드 위치
// 코드 위치

"use strict";

var posts = document.createElement("posts");
$(posts).appendTo("body");
var init_post_number = showAllPosts();



function getPostNumber() {

    let post_number;

    $.ajax({
        url: "https://test-cea81.firebaseio.com/posts/post_number.json",
        async: false,
        method: "GET",
        success: function (data) {
            post_number = data;
        }
    });

    if (post_number == null) post_number = 0;

    return post_number;
}

function postNumberPlus() {
    let post_number = getPostNumber();

    post_number++;

    let param = {
        "post_number": post_number
    };

    $.ajax({
        url: "https://test-cea81.firebaseio.com/posts.json",
        async: false,
        method: "PATCH",
        data: JSON.stringify(param),
        success: function (data) {
        }
    });
}

function addNewPost(title, body, hash_tag) {

    let date = new Date();

    let postData = {
        body: body,
        title: title,
        date: date,
        hash_tag: hash_tag,
    };

    let post_number = getPostNumber();

    $.ajax({
        url: ("https://test-cea81.firebaseio.com/posts/" + post_number + ".json"),
        async: false,
        method: "PATCH",
        data: JSON.stringify(postData),
        success: function (data) {
        }
    });

    postNumberPlus();
}

function addNewPostbyData() {

    let input_title = document.getElementById("input_title").value;
    let input_body = CKEDITOR.instances.input_body.getData();
    let input_hash_tag = document.getElementById("input_hash_tag").value;

    addNewPost(input_title, input_body, input_hash_tag);

    clearInput();

    let i = getPostNumber() - 1;

    let post_i = document.createElement("post" + i);
    post_i.className = "post";

    if ((i >= getPostNumber()) || (getPostTitle(i) == null)) return null;

    let post_title = document.createElement("post_title");
    post_title.innerHTML = getPostTitle(i);
    let post_body = document.createElement("post_body");
    post_body.innerHTML = getPostBody(i);

    let post_date = document.createElement("post_date");
    let date_string = getPostDate(i);
    post_date.innerHTML = "date : " + date_string.substring(0, 10) + " / " + date_string.substring(11, 19);

    let post_hash_tag = document.createElement("post_hash_tag");
    post_hash_tag.innerHTML = "hash tag : " + getPostHashTag(i);

    let delete_button = document.createElement("delete_button");
    delete_button.innerHTML = "<input type='button' class='btn btn-default' onclick='deletePost(" + i + ");' value='delete' />";
    let modify_button = document.createElement("modify_button");
    modify_button.innerHTML = "<input type='button' class='btn btn-default' onclick='modifyPost(" + i + ");' value='modify' />";

    $(post_title).appendTo(post_i);
    $(delete_button).appendTo(post_i);
    $(modify_button).appendTo(post_i);
    $(post_date).appendTo(post_i);
    $(post_body).appendTo(post_i);
    $(post_hash_tag).appendTo(post_i);

    $(post_i).prependTo("posts");
}

function clearInput() {
    document.getElementById("input_title").value = "";
    CKEDITOR.instances.input_body.setData("");
    document.getElementById("input_hash_tag").value = "";
}

//************

function getPostTitle(i) {
    let post_title;
    $.ajax({
        url: ("https://test-cea81.firebaseio.com/posts/" + i + "/title.json"),
        async: false,
        method: "GET",
        success: function (data) {
            post_title = data;
        }
    });
    return post_title;
}

function getPostBody(i) {
    let post_body;
    $.ajax({
        url: ("https://test-cea81.firebaseio.com/posts/" + i + "/body.json"),
        async: false,
        method: "GET",
        success: function (data) {
            post_body = data;
        }
    });
    return post_body;
}

function getPostDate(i) {
    let post_date;
    $.ajax({
        url: ("https://test-cea81.firebaseio.com/posts/" + i + "/date.json"),
        async: false,
        method: "GET",
        success: function (data) {
            post_date = data;
        }
    });
    return post_date;
}

function getPostHashTag(i) {
    let hash_tag;
    $.ajax({
        url: ("https://test-cea81.firebaseio.com/posts/" + i + "/hash_tag.json"),
        async: false,
        method: "GET",
        success: function (data) {
            hash_tag = data;
        }
    });
    return hash_tag;
}

function deletePost(i) {
    $.ajax({
        url: ("https://test-cea81.firebaseio.com/posts/" + i + ".json"),
        async: false,
        method: "DELETE",
        success: function (data) {
            $("post" + i).remove();
        }
    });
}

function modifyPost(i) {
    document.getElementById("input_title").value = getPostTitle(i);
    CKEDITOR.instances.input_body.setData(getPostBody(i));
    document.getElementById("input_hash_tag").value = getPostHashTag(i);
    deletePost(i);
}


function showPost(i) {
    let post_i = document.createElement("post" + i);
    post_i.className = "post";

    if ((i >= getPostNumber()) || (getPostTitle(i) == null)) return null;

    let post_title = document.createElement("post_title");
    post_title.innerHTML = getPostTitle(i);
    let post_body = document.createElement("post_body");
    post_body.innerHTML = getPostBody(i);

    let post_date = document.createElement("post_date");
    let date_string = getPostDate(i);
    post_date.innerHTML = "date : " + date_string.substring(0, 10) + " / " + date_string.substring(11, 19);

    let post_hash_tag = document.createElement("post_hash_tag");
    post_hash_tag.innerHTML = "hash tag : " + getPostHashTag(i);

    let delete_button = document.createElement("delete_button");
    delete_button.innerHTML = "<input type='button' class='btn btn-default' onclick='deletePost(" + i + ");' value='delete' />";
    let modify_button = document.createElement("modify_button");
    modify_button.innerHTML = "<input type='button' class='btn btn-default' onclick='modifyPost(" + i + ");' value='modify' />";

    $(post_title).appendTo(post_i);
    $(delete_button).appendTo(post_i);
    $(modify_button).appendTo(post_i);
    $(post_date).appendTo(post_i);
    $(post_body).appendTo(post_i);
    $(post_hash_tag).appendTo(post_i);

    $(post_i).appendTo(posts);

    return 0;
}

function showAllPosts() {
    let i;
    for (i = getPostNumber() - 1; i >= 0; i--) {
        showPost(i);
        if ($(document).height() - $(window).height() != 0) break;
    }
    return i;
}

function infinityScroll() {
    let num = init_post_number;
    $(window).scroll(function () {
        if ($(window).scrollTop() + 50 > $(document).height() - $(window).height()) {
            while (num >= 0) {
                num--;
                if (showPost(num) == 0) break;
            }
        }
    });
}

infinityScroll();

//****************************************

function searchHashTag() {
    let searching_hash_tag = document.getElementById("search_hash_tag").value;
    document.getElementById("search_hash_tag").value = "";
    $("posts").empty();

    for (var i = getPostNumber() - 1; i >= 0; i--)
        if (getPostHashTag(i) == searching_hash_tag) showPost(i);
}

//*****************************
//리사이징

$(window).resize(resizing());

function resizing() {
    let window_width = $(window).width();

    if (window_width <= 1080) {

    }
}

function showWriteMode() {
    $("mobile_hide").css("display", "inline-block");
    document.getElementById("show_write_mode").style.display = "none";
    document.getElementById("hide_write_mode").style.display = "block";
}

function hideWriteMode() {
    $("mobile_hide").css("display", "none");
    document.getElementById("show_write_mode").style.display = "block";
    document.getElementById("hide_write_mode").style.display = "none";
}