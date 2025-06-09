# Hello React Excel Add-in

This project contains a minimal React-based Excel add-in that displays **Hello World**.

## Running the add-in

1. Start the local server:
   ```bash
   node server.js
   ```
   The server hosts the add-in files on `https://localhost:3000`. If the required
   certificates do not exist they will be generated automatically.

2. Sideload the add-in in Excel by loading the `manifest.xml` file. See the [Office Add-in sideloading documentation](https://learn.microsoft.com/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins) for details.

When the add-in pane opens, it renders a React component that shows `Hello World`.
Note: icons were removed to avoid binary files in the repository.
