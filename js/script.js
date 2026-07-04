/*
  ハウジング万博 2026 共通JavaScript
  このファイルでは「見た目を少し楽しくする処理」だけを扱います。
  ページ内容そのものはHTMLに書いてあるので、JavaScriptを切っても読めます。
*/

// HTMLの読み込みが終わってから処理を始めます。
document.addEventListener("DOMContentLoaded", function () {
  setupFadeIn();
  setupCurrentPageLinks();
});

/*
  画面に入った要素をふわっと表示する処理です。
  IntersectionObserverは「要素が画面に入ったか」を見張るための標準機能です。
*/
function setupFadeIn() {
  var targets = document.querySelectorAll(".js-fade");

  // 対象がなければ、ここで処理を終わります。
  if (targets.length === 0) {
    return;
  }

  // 古いブラウザなどでIntersectionObserverが使えない場合は、
  // すべて表示状態にしておきます。
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  targets.forEach(function (target) {
    target.classList.add("fade-ready");
    observer.observe(target);
  });
}

/*
  今開いているページへのリンクに目印を付けます。
  CSSで .is-current を使えば、現在地の見た目を変えられます。
*/
function setupCurrentPageLinks() {
  var currentFile = location.pathname.split("/").pop() || "index.html";
  var links = document.querySelectorAll("a[href]");

  links.forEach(function (link) {
    var href = link.getAttribute("href");

    if (href === currentFile) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
  });
}
