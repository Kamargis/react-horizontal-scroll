import * as React from "react";
import styled from "styled-components";
import _ from "lodash";

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
    this.state = {};
    this.scrollToNextPage = this.scrollToNextPage.bind(this);
  }

  componentDidMount() {
    // console.log(element);
    window.addEventListener("wheel", _.debounce(this.scrollToNextPage, 200));
  }

  scrollToNextPage({ deltaY }) {
    const container = document.querySelector("#layout-container");
    // Mouse wheel up
    if (deltaY < 0) {
      return container.scrollTo({
        left:
          container.scrollLeft > 0
            ? container.scrollLeft - container.getBoundingClientRect().width
            : 0
      });
    }

    // Mouse wheel down
    return container.scrollTo({
      left:
        container.scrollLeft <
        container.getBoundingClientRect().width * this.props.pages.length
          ? container.scrollLeft + container.getBoundingClientRect().width
          : container.getBoundingClientRect().width * this.props.pages.length
    });
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
