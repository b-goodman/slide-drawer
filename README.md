# slide-drawer

## Installation

```bash
npm install @bgoodman/slide-drawer

yarn add @bgoodman/slide-drawer
```

## Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>slide-drawer</title>
    <script type="module" src="./dist/index.js"></script>
    <style>
        html {
            height: 100%;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <slide-drawer>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
    </slide-drawer>


    <button id="open-drawer">Toggle Drawer</button>

    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>

    <img src="http://lorempixel.com/400/200/"/>
</body>

<script>
    document.querySelector("#open-drawer").addEventListener("click", () => {
        document.querySelector("slide-drawer").toggle()
    })
</script>


</html>
```

## Attributes

### `open`

Defines if the drawer is visible.  Takes values `"true"` or `"false"` (default).

### `position`

Defines which side of the page the drawer slides in from.

Takes values `"right"` (default), `"left"`, `"bottom"` and `"top"`.

----

## Methods

### `toggle(): void`

Opens(Closes) the drawer if it is currently closed(open).

----

## Events

### `"slide-drawer-open"`

Emitted when the drawer's `open` attribute is set to `"true"`.

### `"slide-drawer-close"`

Emitted when the drawer's `open` attribute is set to `"false"`.
