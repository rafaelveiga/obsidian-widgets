# Obsidian Widgets

Adds widgets within Obsidian

## Usage

To insert a widget, simply add a code block with the language `widgets` and add your options to the body

````
```widgets
<OPTIONS>
```
````

Currently available widgets are:

### Clock

![Clock](public/clock.png)

#### Configuration Body

_none_

#### Example

````
```widgets
type: clock
```
````

### Quote

![Quote](public/quote.png)

#### Configuration Body:

`type`: quote

`quote`: the quote you want to display

`author`: the author of the quote (optional)

#### Example

````
```widgets
type: quote
quote: "Lorem ipsum dolor sit amet"
author: Lorem Ipsum
```
````

### Countdown

![Countdown](public/countdown.png)

#### Configuration Body:

`type`: countdown

`date`: Must be in the format `YYYY-MM-DD HH:MM:SS`

`to`: Description of the countdown

#### Example

````
```widgets
type: countdown
date: 2024-01-01 00:00:00
to: New Year! 🎉
```
````
