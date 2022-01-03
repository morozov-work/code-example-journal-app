export class ScrollWatcher {
  constructor({ context, valueName, container, target }) {
    this.context = context;
    this.valueName = valueName;
    this.container = container;
    this.target = target;
    this.watcherRun = ScrollWatcher.watcher.bind(this);
    this.watcherRun();
  }

  static watcher() {
    const context = this.context;
    const valueName = this.valueName;
    const container = this.container;
    const target = this.target;

    container.addEventListener("scroll", () => {
      context[valueName] =
        container.scrollHeight - container.clientHeight - container.scrollTop;
    });

    const observer = new ResizeObserver(() => {
      context[valueName] =
        container.scrollHeight === container.clientHeight
          ? 0
          : container.scrollHeight -
            container.clientHeight -
            container.scrollTop;
    });

    observer.observe(target);
  }
}
