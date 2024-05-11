# Styling your widgets

We currently do not support and don't plan to support customizing styles and colors of each widget via options in the widgets code block. Each widget is set to respect your theme's colors. That does not mean you can further customize the look of your widgets to your liking via CSS Snippets.

To customize the widgets via snippets, start by following [Obsidian's official guide](https://help.obsidian.md/Extending+Obsidian/CSS+snippets) on CSS Snippets and how to add yours.

To customize each independent widget, you can follow the CSS Classes outlined below and add it to your snippet file.

## Clock

-   `.Clock_Face`: The container for the clock, also affects the clock time
-   `.Clock_Divider`: The lines dividing the clock from the page
-   `.Clock_Date`: The date that shows below the clock
-   `.Clock__time-container`: The container for the time + AM/PM text
-   `.Clock__time`: The time itself
-   `.Clock__am-pm`: The AM/PM text

## Quote

-   `.Quote_Container`: The container box for the quote
-   `.Quote_Text`: The quote itself
-   `.Quote_Author`: The author of the quote

## Countdown

-   `.Countdown_Container`: The container for the countdown
-   `.Countdown_Item`: The box containing the seconds, minutes, hours, days. Can be further customized by:
    -   `.Countdown_Item h3` to alter the time value type
    -   `.Countdown_Item small` to alther the "days", "hours", "minutes", "seconds" text of each box
-   `.Countdown_To`: The text that shows what the countdown is counting down to

## Counter

-   `.Counter_Container`: The container for the counter
-   `.Counter__counter`: The counter itself, containing the number and the buttons
-   `.Counter__text`: The text that shows what the counter is counting
