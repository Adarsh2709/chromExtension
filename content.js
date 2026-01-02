const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBELM_KEY = "AZ_PROBLEM_KEY";

function addBookmarkButton() {
  const heading = document.querySelector(
    '[class^="coding_problem_info_heading"]'
  );
  if (!heading) return;

  if (document.getElementById("add-bookmark-button")) return;

  const bookmarkButton = document.createElement("img");
  bookmarkButton.id = "add-bookmark-button";
  bookmarkButton.src = bookmarkImgURL;
  bookmarkButton.style.height = "30px";
  bookmarkButton.style.width = "30px";
  bookmarkButton.style.cursor = "pointer";
  bookmarkButton.style.marginTop = "8px";
  bookmarkButton.style.display = "block";

  heading.insertAdjacentElement("beforeend", bookmarkButton);
  bookmarkButton.addEventListener("click", addNewBookmarkHandler);
}

// React-safe observer
const observer = new MutationObserver(addBookmarkButton);
observer.observe(document.body, { childList: true, subtree: true });

async function addNewBookmarkHandler() {
  const currentBookmark = await getCurrentBookmark();

  const AZProblemURL = window.location.href;
  const uniqueId = extractUniqueId(AZProblemURL);

  const problemName = document
    .querySelector('[class^="coding_problem_info_heading"]')
    ?.innerText?.trim();

  if (!problemName) return;

  if (currentBookmark.some((b) => b.id === uniqueId)) {
    console.log("Already bookmarked");
    return;
  }

  const bookmarkObj = {
    name: problemName,
    id: uniqueId,
    url: AZProblemURL,
  };

  const updatedBookmarks = [...currentBookmark, bookmarkObj];

  chrome.storage.sync.set({ [AZ_PROBELM_KEY]: updatedBookmarks }, () =>
    console.log("Bookmark added:", bookmarkObj)
  );
}

function extractUniqueId(url) {
  const start = url.indexOf("problems/") + "problems/".length;
  const end = url.indexOf("?", start);
  return end === -1 ? url.substring(start) : url.substring(start, end);
}

function getCurrentBookmark() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([AZ_PROBELM_KEY], (results) => {
      resolve(results[AZ_PROBELM_KEY] || []);
    });
  });
}
