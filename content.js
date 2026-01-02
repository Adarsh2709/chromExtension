const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");

window.addEventListener("load",addBookmarkButton);

function addBookmarkButton() {
    
    const bookmarkButton = document.createElement("img");
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImgURL;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";
    bookmarkButton.style.cursor = "pointer";
    bookmarkButton.style.marginTop = "8px";
    bookmarkButton.style.display = "block";
    bookmarkButton.style.marginLeft = "0";
    bookmarkButton.style.alignSelf = "flex-start";

    const heading = document.querySelector('[class^="coding_problem_info_heading"]');

    heading.insertAdjacentElement("beforeend",bookmarkButton);

    bookmarkButton.addEventListener("click",)
}
