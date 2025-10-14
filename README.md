# Technical Specifications Document

## 1. Title Page
| Project Name: | &#9992;&#65039; Airline Booking System                                                                                 |
|---------------|--------------------------------------------------------------------------------------------------------|
| Version       | 1.0.0                                                                                                  |
| Date          | October 14, 2025                                                                                       |
| Authors       | [Cris Bagotsay](https://github.com/blink1197/)<br>[Richard Delos Trinos](https://github.com/richard-DT)|

## 2. Table of Contents
1. [Title Section](#1-title-page)
2. [Table of Contents](#2-table-of-contents)
3. [Features and Scope (Phase 1)](#3-features-and-scope-phase-1)
4. [Functional Requirements (FR)](#4-functional-requirements-fr)
5. [Non-Functional Requirements (NFR)](#5-non-functional-requirements-nfr)
6. [External Interface Requirements](#6-external-interface-requirements)
7. [Visual Mock-up (Figma) and ERD](#7-visual-mock-up-figma-and-erd)
8. [Data Requirements](#8-data-requirements)
9. [Glossary](#9-glossary)
10. [Appendices](#10-appendices)

## 3. Features and Scope (Phase 1)
This phase focuses only on the Core Search and Display as the Minimum Viable Product (MVP).
| Feature Area    | Description                                       | Scope                                                                                                      |
|-----------------|---------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| Flight Search   | Core logic for finding flights based on criteria. | **IN:** One-way flights, Origin, Destination, Date.<br>**OUT:** Round-trip search is excluded.             |
| Results Display | Presenting the returned flight data to the user.  | **IN:** Dynamic, scrollable cards displaying Price,<br> Times, Duration, Airline, and basic sorting/filtering. |
| Architecture    | The front-end application structure.              | **IN:** Mobile-Responsive Single Page Web Application (SPA).                                               |
| Booking/Account | User accounts and transaction management.         | **OUT:** User Login/Logout, User Profile, Booking/Payment workflow<br> [(See Excluded Features)](#43-fr---excluded-features-phase-1-boundary).                 |

## 4. Functional Requirements (FR)
The technical specifications should cover both Frontend and Backend requirements.
### 4.1 FR - Frontend (User Interface)
| ID          | Requirement            | Description                                                                                                                                          |
|-------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| FR-FE-01    | Search Input           | Display input fields for **Origin**, **Destination**, **Departure Date**, and a **Search** button on the landing screen.                             |
| FR-FE-02    | Results Display Cards  | Display flight results in dynamic cards showing **route**, **times**, **duration**, and **formatted price**.<br> The component must include a cut-off visual element at the bottom to imply scrollable content. |
| FR-FE-03    | Search Options Display | Display buttons for **“Round-trip”** and **“One-way”**, but ensure only **“One-way”** search is functional.                                          |
| FR-FE-04    | Utility Footer         | Include a functional **Footer** element displaying basic contact information.                                                                        |
| FR-FE-05    | Navigation Menu        | Include a **hamburger menu button** on the navigation bar for mobile responsiveness.                                                                 |

### 4.2 FR - Backend (Core Logic & Data)
| ID          | Requirement          | Description                                                                                |
|-------------|----------------------|--------------------------------------------------------------------------------------------|
| FR-BE-01    | Search API Endpoint  | Expose a stable REST API endpoint (/v1/flights/search) to process one-way search requests. |
| FR-BE-02    | Data Aggregation     | Calculate total flight duration and format the price based on flight data.                 |
| FR-BE-03    | Airport Data Service | Provide an API endpoint (/v1/airports) for the frontend's airport auto-complete feature.   |

### 4.3 FR - Excluded Features (Phase 1 Boundary)
The following pages and features are explicitly excluded from Phase 1:
* Login/Logout
* User Profile
* Booking Confirmation/ltinerary details
* Manage Booking, Check-in, Flight Status
* Round-Trip Search

## 5. Non-Functional Requirements (NFR)
| ID          | Category     | Requirement          | Description                                                                       |
|-------------|--------------|----------------------|-----------------------------------------------------------------------------------|
| NFR-P-01    | Performance  | search Latency       | < 2 seconds (for 95% of searches)                                                 |
| NFR-P-02    | Architecture | Web Application Type | Application must be a Single Page Web Application (SPA).                          |
| NFR-U-01    | Usability    | Device Compatibility | Application must be fully mobile- responsive (including mobile and tablet views). |
| NFR-S-01    | Security     | Input Validation     | Implement comprehensive input sanitation and validation on all API parameters.    |

## 6. External Interface Requirements
This includes descriptions of user interfaces, APIs, and interactions with other systems.
* Design Inspiration: The user experience should draw inspiration from Airline Booking applications<br> such as Cebu Pacific, Philippine Airlines, and Singapore Airlines.

## 7. Visual Mock-up (Figma) and ERD
The document must include a Visual Mock-up and an ERD.

#### 7.1 Figma Mock-up Requirements
* Tool
    * Create a visual mock-up using Figma. You can use the Figma Community for flight booking app templates for guidance.
* Views
    * Must include mobile and tablet views.
* Style Guide
    * The Figma file must include a Style Guide component covering Typography, Color Palette, and Branding.
* Access
    * The link must be Public to allow future employers to view the project.

#### 7.2 TSD Inclusion
* [Public Figma Link](https://www.figma.com/design/CMczN2gNCB3fZ5wZHwscPi/ABS-Mock-Up?node-id=2-311&t=Bitt7Q5CpQQC3nrK-1)
* ERD Link/Image

## 8. Data Requirements
The document must include data models, database schemas, and an ERD.

#### 8.1 Entity-Relationship Diagram (ERD)
The ERD must be created based on your specifications to illustrate the relationship of data.
| Entity (Phase 1 Relevant)  | Key Field             | Key Attributes                                                 |
|----------------------------|-----------------------|----------------------------------------------------------------|
| **Airline_info**           | **airlineId (PK)**    | name, logo                                                     |
| **Flight_details**         | **flightId (PK)**     | fromLocation, toLocation, departureDate, price, seatsAvailable |

_*** Note: The full provided ERD also includes User_info, Booking_details, Passenger _ details,
Ticket_info, and Payment_details, but these are deferred for Phase 1.***_

## 9. Glossary
Definitions of terms and acronyms used in the document.

| Term / Acronym | Definition                        |
|:--------------:|-----------------------------------|
| **TSD**        | Technical Specifications Document |
| **MVP**        | Minimum Viable Product            |
| **ERD**        | Entity-Relationship Diagram       |
| **SPA**        | Single Page Application           |

## 10. Appendices

#### 10.1 Revision History
| Version | Date           | Author(s)                                      | Description / Changes Made                          |
|----------|----------------|------------------------------------------------|-----------------------------------------------------|
| 1.0.0    | October 15, 2025 | [Cris Bagotsay](https://github.com/blink1197/),<br> [Richard Delos Trinos](https://github.com/richard-DT) | Initial draft of the Technical Specifications Document. |

#### 10.2 GitHub Repository & Collaboration Guidelines
* Repository: Create a new public GitHub repo called airline-booking-system.
* Document Format: TSD must be a markdown file in the repository.
* Collaboration: The Assigned Group Leader should add members via email invitation and must review updates before merging.

#### 10.3 Project Management (Trello Task Board)
* Deliverable: Create a Trello Task Board (which includes the instructor) to disseminate and assign task cards.
* Task Format: Task cards should follow the naming convention: FEAT000-<feature>.
* [Trello Link](https://trello.com/b/HF3RtK5X/airline-booking-system)

#### 10.4 Project Management (Trello Task Board)
* Duration: Group of 3-5 Bootcampers for a project lasting at least 2 weeks.
* Consultation: Groups must schedule at least three 30-minute consultation sessions (3 days prior) with the instructors/consultants during available work hours.<br> The Group Leader schedules the consultation using the Google Calendar App.
* Check-in: Instructors will check-in regularly via a group chat (created by the instructor).
