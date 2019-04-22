import * as React from "react";
import styled from "styled-components";
import _ from "lodash";
import { scrollTo } from "../../technical/scrollTo";

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: scroll;
  white-space: nowrap;
`;

const PageContainer = styled.div(props => ({
  position: "relative",
  width: "100%",
  height: "100%",
  border: "1px dashed black",
  boxSizing: "border-box",
  display: "inline-block"
}));

class HorizontalScrollLayout extends React.Component {
  constructor(props) {
    super(props);
    this.activePageIndex = 0;
    this.duration = this.props.duration || 700;
    this.easing = this.props.easing || "easeOutQuad";
    this.scrollToNextPage = this.scrollToNextPage.bind(this);
  }

  componentDidMount() {
    // To avoid firing the event too many times
    window.addEventListener("wheel", _.debounce(this.scrollToNextPage, 200));
  }

  scrollToNextPage({ deltaY }) {
    const container = document.querySelector("#layout-container");

    // Mouse wheel up, going backward
    if (deltaY < 0) {
      this.activePageIndex = Math.max(0, this.activePageIndex - 1);
      const nextPageElement = document.querySelector(
        `#page_${this.activePageIndex}`
      );
      return scrollTo(container, nextPageElement, this.duration, this.easing);
    }

    // Mouse wheel down, goig forward
    this.activePageIndex =
      this.activePageIndex + 1 < this.props.pages.length - 1
        ? this.activePageIndex + 1
        : this.props.pages.length - 1;
    const nextPageElement = document.querySelector(
      `#page_${this.activePageIndex}`
    );
    return scrollTo(container, nextPageElement, this.duration, this.easing);
  }

  render() {
    const { pages = [] } = this.props;
    return (
      <LayoutContainer id="layout-container">
        {pages.map((component, i) => {
          return (
            <PageContainer id={`page_${i}`} key={i}>
              {component}
            </PageContainer>
          );
        })}
      </LayoutContainer>
    );
  }
}

export default HorizontalScrollLayout;
