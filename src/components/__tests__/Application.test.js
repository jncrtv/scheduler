import React from "react";

import axios from "axios";


import { render, cleanup, act } from "@testing-library/react";


import { waitForElement } from "@testing-library/react";

import { fireEvent } from "@testing-library/react";

import { getByText } from "@testing-library/react";

import { prettyDOM } from "@testing-library/react";

import { getAllByTestId } from "@testing-library/react";

import { getByAltText, queryByAltText } from "@testing-library/react";

import { getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  //BOOK
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug, getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Monday"));

    // console.log(prettyDOM(container));
    await waitForElement(() => getByText("Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    act(() => {
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    })
    act(() => {
      fireEvent.click(getByText("Save"));
    })
  
    expect(getByText("Saving")).toBeInTheDocument();
  
    await waitForElement(() => getByText("Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  //CANCEL
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug, getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Monday"));
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText("Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText("Are you sure you want to delete?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText("Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  //EDIT
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug, getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Monday"));
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText("Archie Cohen"));
  
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    // 4. Check that the current Student name is shown.
    expect(
      getByText("Archie Cohen")
    ).toBeInTheDocument();

    // 4.a Change the current student name to Lydia Miller-Jones
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 4.b Click Sylvia Palmer as the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    // 5. Click the "Save" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Save"));
  
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText("Saving")).toBeInTheDocument();
  
    // 7. Wait until the appoinment element is displayed.
    await waitForElement(() => getByText("Lydia Miller-Jones"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(" spots remaining")).toBeInTheDocument();
  });

  //FAIL SAVE ERROR
  xit("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
  
  //FAIL DELETE ERROR
  xit("shows the delete error when failing to delete an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
})