import { Rule } from "../../common/models/rule.model";

export const TablesStructure = [
  null,
  null,
  [
    [[Rule.opposition, Rule.revier], Rule.reporter],
    [Rule.reporter, [Rule.opposition, Rule.revier]],
  ],
  [
    [Rule.opposition, Rule.revier, Rule.reporter],
    [Rule.revier, Rule.reporter, Rule.opposition],
    [Rule.reporter, Rule.opposition, Rule.revier],
  ],
  [
    [Rule.opposition, Rule.observer, Rule.revier, Rule.reporter],
    [Rule.observer, Rule.revier, Rule.reporter, Rule.opposition],
    [Rule.revier, Rule.reporter, Rule.opposition, Rule.observer],
    [Rule.reporter, Rule.opposition, Rule.observer, Rule.revier],
  ],
  [
    [Rule.opposition, Rule.observer, Rule.observer, Rule.revier, Rule.reporter],
    [Rule.observer, Rule.observer, Rule.revier, Rule.reporter, Rule.opposition],
    [Rule.observer, Rule.revier, Rule.reporter, Rule.opposition, Rule.observer],
    [Rule.revier, Rule.reporter, Rule.opposition, Rule.observer, Rule.observer],
    [Rule.reporter, Rule.opposition, Rule.observer, Rule.observer, Rule.revier],
  ],
];
