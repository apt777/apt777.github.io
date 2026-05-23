(function () {
  var data = window.siteData || { overviewStats: [], recordSpaces: [] };

  function byDateDesc(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  function entryHref(space) {
    return "record.html?space=" + encodeURIComponent(space.slug);
  }

  function flattenEntries() {
    return data.recordSpaces
      .flatMap(function (space) {
        return space.entries.map(function (entry) {
          return {
            space: space,
            entry: entry
          };
        });
      })
      .sort(function (left, right) {
        return byDateDesc(left.entry, right.entry);
      });
  }

  function renderOverviewStats() {
    var root = document.getElementById("overview-stats");

    if (!root) {
      return;
    }

    root.innerHTML = data.overviewStats.map(function (stat) {
      return [
        '<article class="stat-card">',
        "<p class=\"eyebrow\">" + stat.label + "</p>",
        "<strong>" + stat.value + "</strong>",
        "<p>" + stat.description + "</p>",
        "</article>"
      ].join("");
    }).join("");
  }

  function renderSpaceCards(targetId, limit) {
    var root = document.getElementById(targetId);

    if (!root) {
      return;
    }

    var spaces = limit ? data.recordSpaces.slice(0, limit) : data.recordSpaces;

    root.innerHTML = spaces.map(function (space) {
      return [
        '<article class="space-card">',
        '<div class="space-card-header">',
        "<div>",
        "<p class=\"eyebrow\">" + space.shortLabel + "</p>",
        "<h3>" + space.title + "</h3>",
        "</div>",
        '<span class="tag">' + space.cadence + "</span>",
        "</div>",
        "<p>" + space.description + "</p>",
        '<div class="space-meta">',
        '<span class="meta-pill">' + space.scope + "</span>",
        '<span class="meta-pill">entries ' + space.entries.length + "</span>",
        "</div>",
        '<a class="text-link" href="' + entryHref(space) + '">공간 열기</a>',
        "</article>"
      ].join("");
    }).join("");
  }

  function renderRecentEntries() {
    var root = document.getElementById("recent-entries");

    if (!root) {
      return;
    }

    var recent = flattenEntries().slice(0, 6);

    root.innerHTML = recent.map(function (item) {
      return [
        '<article class="entry-card">',
        '<div class="entry-card-header">',
        "<div>",
        '<span class="entry-date">' + item.entry.date + "</span>",
        "<h3>" + item.entry.title + "</h3>",
        "</div>",
        '<span class="tag">' + item.space.title + "</span>",
        "</div>",
        "<p>" + item.entry.summary + "</p>",
        '<div class="entry-notes">',
        "<ul class=\"check-list\">",
        item.entry.bullets.map(function (bullet) {
          return "<li>" + bullet + "</li>";
        }).join(""),
        "</ul>",
        "</div>",
        '<p class="page-footer-note"><a class="text-link" href="' + entryHref(item.space) + '">관련 공간 보기</a></p>',
        "</article>"
      ].join("");
    }).join("");
  }

  function renderRecordDetail() {
    var root = document.getElementById("record-detail-root");

    if (!root) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var slug = params.get("space");
    var space = data.recordSpaces.find(function (item) {
      return item.slug === slug;
    });

    if (!space) {
      root.innerHTML = [
        '<section class="panel section-block empty-state">',
        "<p class=\"eyebrow\">Not found</p>",
        "<h1>기록 공간을 찾을 수 없습니다.</h1>",
        '<p>올바른 공간 링크로 다시 이동하거나 <a class="text-link" href="records.html">기록 목록</a>으로 돌아가세요.</p>',
        "</section>"
      ].join("");
      return;
    }

    root.innerHTML = [
      '<section class="record-hero">',
      '<article class="panel section-block">',
      "<p class=\"eyebrow\">" + space.shortLabel + " space</p>",
      "<h1>" + space.title + "</h1>",
      "<p class=\"lede\">" + space.description + "</p>",
      '<div class="record-meta">',
      '<span class="meta-pill">' + space.cadence + "</span>",
      '<span class="meta-pill">' + space.scope + "</span>",
      '<span class="meta-pill">entries ' + space.entries.length + "</span>",
      "</div>",
      "</article>",
      '<aside class="detail-meta">',
      "<dl>",
      "<div><dt>Purpose</dt><dd>" + space.description + "</dd></div>",
      "<div><dt>Cadence</dt><dd>" + space.cadence + "</dd></div>",
      "<div><dt>Scope</dt><dd>" + space.scope + "</dd></div>",
      "</dl>",
      "</aside>",
      "</section>",
      '<section class="detail-focus">',
      space.prompts.map(function (prompt, index) {
        return [
          '<article class="focus-card">',
          "<p class=\"eyebrow\">Prompt " + (index + 1) + "</p>",
          "<h3>" + prompt + "</h3>",
          "</article>"
        ].join("");
      }).join(""),
      "</section>",
      '<section class="panel section-block">',
      '<div class="section-heading">',
      "<div>",
      "<p class=\"eyebrow\">Entries</p>",
      "<h2>기록 목록</h2>",
      "</div>",
      '<a class="text-link" href="records.html">목록으로 돌아가기</a>',
      "</div>",
      '<div class="detail-entry-list">',
      space.entries.sort(byDateDesc).map(function (entry) {
        return [
          '<article class="entry-card">',
          '<div class="entry-card-header">',
          "<div>",
          '<span class="entry-date">' + entry.date + "</span>",
          "<h3>" + entry.title + "</h3>",
          "</div>",
          "</div>",
          "<p>" + entry.summary + "</p>",
          '<div class="entry-notes">',
          "<ul class=\"check-list\">",
          entry.bullets.map(function (bullet) {
            return "<li>" + bullet + "</li>";
          }).join(""),
          "</ul>",
          "</div>",
          "</article>"
        ].join("");
      }).join(""),
      "</div>",
      "</section>"
    ].join("");
  }

  function init() {
    renderOverviewStats();
    renderSpaceCards("home-spaces", 3);
    renderSpaceCards("records-spaces");
    renderRecentEntries();
    renderRecordDetail();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
