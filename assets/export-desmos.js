// assets/export-desmos.js

// wait till nav bar fully loaded
document.addEventListener("navbar-loaded", function () {
  const btn = document.getElementById("export-desmos-btn");

  if (!btn) {
    console.warn("export-desmos-btn not found after navbar-loaded");
    return;
  }

  // Incase this block is used for multiple times in a graph
  if (btn.dataset.exportBound === "true") return;
  btn.dataset.exportBound = "true";

  // download file name based on the html name
  let filename = window.location.pathname.split("/").pop() || "graph";
  filename = filename.replace(/\.html$/i, "");  // remove .html
  const downloadName = filename + ".png";

  btn.addEventListener("click", function () {
    if (typeof Calc === "undefined" || !Calc.asyncScreenshot) {
      console.error("Desmos Calc is not ready, cannot export screenshot.");
      return;
    }

    const opts = {
      format: "png",   
      width: 1200,
      height: 800,
      targetPixelRatio: 2,
      showLabels: true,
    };

    Calc.asyncScreenshot(opts, function (dataUrl) {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = downloadName;  // 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
});
