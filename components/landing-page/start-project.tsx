"use client";

import ProjectForm from "./project-form";
import {useEffect} from "react";

export default function StartProject() {
  const loadTallyEmbeds = () => {
    if (typeof window !== "undefined" && window.Tally) {
      window.Tally.loadEmbeds();
    }
  };

  useEffect(() => {
    loadTallyEmbeds();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const iframe = document.querySelector("iframe[data-tally-src]");
          if (iframe instanceof HTMLIFrameElement) {
            iframe.setAttribute("data-theme", "dark");
          }
        }
      });
    });

    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mb-8 pt-8 text-center">
        <h2 className="text-3xl font-medium text-foreground md:text-5xl">
          Ready to Start <br />
          Your Next <span className="text-primary">Project</span>?
        </h2>
      </div>
      <ProjectForm />
    </div>
  );
}
