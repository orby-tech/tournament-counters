import * as React from "react";
import { JuriesNumberInfo } from "./juries-number";
import { SectionNumberInfo } from "./section-number";
import { StageNumberInfo } from "./stage-number";
import { TourNumberInfo } from "./tour-number";

export function Header() {
  return (
    <>
      <header>
        <h1>Основная информация</h1>
        <div className="tournament-control-block">
          <SectionNumberInfo />
          <JuriesNumberInfo />
          <StageNumberInfo />
          <TourNumberInfo />
        </div>
      </header>
    </>
  );
}
