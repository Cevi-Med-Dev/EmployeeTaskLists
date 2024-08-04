console.log("excecuted");
var call_form_ = document.querySelector("#formContainer form");
var call_formData = new FormData(call_form_);
var currentRole = ""

const roles = {
  "Accounting": {
    daily: [
      "Record daily transactions (sales, purchases, payments, receipts).",
      "Reconcile daily cash and bank statements.",
      "Review and process invoices and expense reports.",
    ],
    weekly: [
      "Update and reconcile accounts payable and receivable.",
      "Review and categorize transactions in the general ledger.",
      "Monitor and manage cash flow, including bank reconciliations.",
      "Prepare and review payroll.",
    ],
    monthly: [
      "Close monthly financial books (record and review journal entries).",
      "Reconcile all balance sheet accounts.",
      "Prepare and review financial statements (income statement, balance sheet, cash flow statement).",
      "Review and approve expense reports and ensure compliance with budgets.",
      "Analyze financial performance and variances from budget.",
    ],
    quarterly: [
      "Prepare and file quarterly tax returns and other regulatory filings.",
      "Review and update financial forecasts and budgets.",
      "Conduct a detailed review of financial performance and key metrics.",
      "Perform internal audits and address any discrepancies.",
    ],
    annual: [
      "Prepare and file annual tax returns and ensure compliance with tax laws.",
      "Conduct year-end closing procedures (reconcile accounts, adjust entries).",
      "Prepare and review annual financial statements and reports.",
      "Coordinate with external auditors for annual audits.",
      "Review and update accounting policies and procedures.",
    ],
    ongoing: [
      "Ensure compliance with accounting standards and regulations.",
      "Maintain accurate and up-to-date financial records.",
      "Manage and safeguard financial documentation and reports.",
      "Monitor changes in accounting regulations and implement necessary updates.",
    ],
    endOfPeriodReview: [
      "Conduct a thorough review of the period’s financial activities.",
      "Address any discrepancies or issues found during the review.",
      "Document lessons learned and improvements for future periods.",
    ],
    systemAndSecurityChecks: [
      "Regularly update accounting software and ensure backups are performed.",
      "Verify data integrity and access controls in accounting systems.",
      "Implement and review internal controls to prevent fraud and errors.",
    ],
    gatherEmployeeInformation: [
      "Collect and verify new hire documentation.",
      "Update any changes in employee status (e.g., promotions, terminations).",
      "Ensure all employee documents are up to date.",
      "Verify direct deposit information for all employees.",
    ],
    preparePayrollData: [
      "Review and approve timesheets.",
      "Calculate hours worked, including overtime.",
      "Confirm salary adjustments.",
      "Update any changes in deductions (e.g., health insurance, retirement contributions).",
      "Issue paychecks or direct deposits.",
      "Maintain accurate payroll records.",
    ],
    receiptAndInvoiceManagement: [
      "Collect and verify receipts and invoices from all departments.",
      "Enter receipts and invoices into the accounting system.",
      "Ensure accuracy and proper categorization of expenses.",
    ],
  },
  "Operationa Manager": {
    daily: [
      "Review and prioritize daily operational activities and tasks.",
      "Monitor key performance indicators (KPIs) and operational metrics.",
      "Conduct briefings with team leaders to review daily goals and issues.",
      "Address and resolve any immediate operational problems or disruptions.",
      "Ensure safety protocols and compliance with company policies are being followed.",
    ],
    weekly: [
      "Review weekly performance reports and operational metrics.",
      "Hold team meetings to discuss progress, challenges, and goals.",
      "Conduct site inspections or audits to ensure operational standards are met.",
      "Review and adjust schedules and resource allocation as needed.",
      "Address any staffing or resource issues and adjust plans accordingly.",
    ],
    monthly: [
      "Analyze and review monthly performance data and operational trends.",
      "Develop and update operational plans and strategies based on performance.",
      "Review and manage budgetary concerns, including operational expenses.",
      "Conduct monthly meetings with department heads to review progress and set new targets.",
      "Ensure all required compliance and regulatory reports are completed.",
    ],
    quarterly: [
      "Assess and review operational efficiency and effectiveness.",
      "Conduct a comprehensive review of processes and workflows for improvements.",
      "Update and adjust long-term operational plans and strategies.",
      "Evaluate and implement any necessary changes in technology or equipment.",
      "Review and renegotiate vendor and supplier contracts if applicable.",
    ],
    annual: [
      "Develop and review the annual operational budget and strategic plan.",
      "Conduct a thorough review of annual performance against targets and goals.",
      "Plan and oversee the implementation of major operational changes or initiatives.",
      "Prepare and present annual operational reports to senior management.",
      "Review and update company policies and procedures as necessary.",
    ],
    ongoing: [
      "Ensure effective communication across all levels of the organization.",
      "Manage and develop team members through training and performance evaluations.",
      "Monitor industry trends and adjust operational strategies accordingly.",
      "Foster a culture of continuous improvement and innovation.",
      "Maintain strong relationships with key stakeholders, including suppliers and customers.",
    ],
    crisisManagement: [
      "Develop and review contingency plans for potential operational disruptions.",
      "Ensure that emergency procedures are in place and communicated to the team.",
      "Respond to and manage any operational crises or emergencies effectively.",
    ],
    documentationAndReporting: [
      "Maintain accurate and up-to-date operational records and documentation.",
      "Prepare and distribute regular operational reports to relevant stakeholders.",
      "Ensure all documentation complies with company standards and regulatory requirements.",
    ],
    endOfPeriodReview: [
      "Conduct a review of operational achievements and areas for improvement.",
      "Address any issues or discrepancies identified during the review.",
      "Implement and document lessons learned for future operational cycles.",
    ],
  },
  "Purchasing Manager": {
    daily: [
      "Review and prioritize purchase orders and requisitions.",
      "Monitor inventory levels and identify reordering needs.",
      "Communicate with suppliers regarding order status and delivery schedules.",
      "Resolve any urgent procurement issues or discrepancies.",
    ],
    weekly: [
      "Review and approve purchase requisitions from various departments.",
      "Analyze and report on purchasing data, including spend analysis and supplier performance.",
      "Coordinate with inventory management to forecast future needs.",
      "Negotiate and review supplier contracts and agreements.",
    ],
    monthly: [
      "Conduct a review of supplier performance and compliance.",
      "Update and maintain a list of preferred suppliers and approved vendors.",
      "Review budget adherence and manage procurement-related expenditures.",
      "Prepare and present purchasing reports to senior management.",
    ],
    quarterly: [
      "Assess and adjust procurement strategies based on market conditions and business needs.",
      "Review and update procurement policies and procedures.",
      "Evaluate and renegotiate supplier contracts as needed.",
      "Conduct supplier audits and performance reviews.",
    ],
    annual: [
      "Develop and review the annual procurement plan and budget.",
      "Conduct comprehensive supplier evaluations and make recommendations for new suppliers.",
      "Prepare for and manage the annual procurement audit.",
      "Review and update long-term sourcing strategies and supplier relationships.",
    ],
    ongoing: [
      "Maintain accurate and up-to-date records of all purchasing transactions.",
      "Implement and monitor procurement best practices and processes.",
      "Build and maintain strong relationships with key suppliers.",
      "Foster good communication and collaboration with suppliers.",
    ],
    identifyCompanyNeeds: [
      "Review and assess the company's inventory needs regularly.",
      "Collaborate with department heads to determine purchasing requirements.",
      "Prioritize purchases based on company goals and budget constraints.",
      "Identify cost-saving opportunities through bulk purchasing or discounts.",
      "Develop a plan for negotiating better terms with suppliers.",
      "Communicate regularly with suppliers to discuss needs and expectations.",
      "Communicate effectively with the purchasing assistant to delegate tasks.",
      "Collect and organize all purchase receipts and invoices.",
      "Ensure all purchasing records are up-to-date and accessible.",
      "Conduct regular inventory checks to assess stock levels.",
      "Coordinate with warehouse staff for accurate stock counts.",
      "Send purchase orders to suppliers and confirm receipt.",
      "Make other departments aware of which items are in stock.",
      "Communicate estimated arrival dates for incoming items.",
      "Update departments on any changes to stock availability or delivery schedules.",
    ],
  },
  "Warranty Customer Service": {
    initialContact: [
      "Verify customer identity and warranty status.",
      "Review the warranty terms and conditions relevant to the product or service.",
      "Gather all necessary information from the customer (e.g., purchase date, product details).",
    ],
    claimVerification: [
      "Confirm that the warranty is valid and has not expired.",
      "Check if the product or service issue falls under the warranty coverage.",
      "Validate that the claim is within the warranty terms (e.g., usage limits, exclusions).",
    ],
    documentation: [
      "Collect and review relevant documents (e.g., proof of purchase).",
      "Ensure all forms and information are accurately completed and filed.",
      "Record claim details in Airtable.",
    ],
    issueAssessment: [
      "Analyze the reported issue and determine the next steps.",
      "Decide if the issue requires inspection, repair, replacement, or a refund.",
      "Communicate with the customer about the assessment and resolution plan.",
    ],
    resolutionProcess: [
      "Coordinate with repair centers or vendors if applicable. (Taskrabbit)",
      "Arrange for product return, repair, or replacement as needed.",
      "Provide clear instructions to the customer on the next steps and any required actions.",
    ],
    followUp: [
      "Monitor the progress of the resolution and ensure timely completion.",
      "Keep the customer informed of any updates or delays.",
      "Verify that the resolution meets the customer’s expectations and resolves the issue.",
    ],
    customerFeedback: [
      "Request feedback from the customer regarding their experience.",
      "Address any further concerns or questions they may have.",
      "Document feedback and use it to improve future service.",
    ],
    documentationAndReporting: [
      "Update customer records with the outcome of the warranty claim.",
      "Prepare and submit any required reports on warranty claims and resolutions.",
      "Analyze claim data for trends and potential areas for improvement.",
    ],
    endOfProcessReview: [
      "Ensure all customer interactions and resolutions are documented.",
    ],
    coordinateWithWarehouseManagement: [
      "Discuss with the warehouse manager the next steps to help customers.",
      "Have daily meetings with the warehouse manager to review all warranties.",
      "Make notes on every invoice in Airtable to document follow-up actions with each customer.",
    ],
    checkCustomerServiceEmail: [
      "Check the customer service email regularly to see if any requests need an open warranty case.",
      "Reply to customers in the customer care email.",
      "If there is a need for repair, look for technicians on the TaskRabbit website.",
    ],
  },
  "TransportationCoordinator": {
    planningAndScheduling: [
      "Review Transportation Needs: Assess transportation requirements for all projects.",
      "Create Schedules: Develop and manage transportation schedules to ensure timely arrivals and departures.",
      "Route Planning: Determine the most efficient routes considering traffic patterns, construction, and other potential delays.",
      "Coordinate with Stakeholders: Communicate with clients, and other stakeholders to ensure alignment on transportation needs.",
      "Coordinate with Stakeholders: Communicate with drivers.",
    ],
    fleetManagement: [
      "Vehicle Maintenance: Ensure all vehicles are regularly inspected and maintained.",
      "Inventory Management: Track vehicle availability and condition.",
      "Compliance Checks: Verify that all vehicles meet regulatory requirements and safety standards.",
    ],
    driverCoordination: [
      "Driver Scheduling: Assign drivers to specific routes and shifts.",
      "Performance Monitoring: Evaluate driver performance and address any issues.",
    ],
    logisticsAndOperations: [
      "Load Management: Oversee the loading and unloading of goods or passengers, ensuring safe and efficient handling.",
      "Problem Resolution: Address and resolve any logistical issues.",
      "Documentation: Maintain records of transportation activities, including schedules, routes, and incidents.",
    ],
    communication: [
      "Internal Communication: Coordinate with other departments to align on transportation needs and issues.",
      "External Communication: Keep clients and external partners informed about schedules, changes, and any issues via email.",
    ],
    complianceAndSafety: [
      "Regulatory Compliance: Ensure adherence to all local, state, and federal transportation regulations.",
      "Safety Protocols: Implement and monitor safety procedures to protect drivers, passengers, and cargo.",
      "Incident Reporting: Document and report any accidents or safety incidents.",
    ],
    technologyAndSystems: [
      "Software Utilization: Use transportation management systems (Samsara) for scheduling, tracking, and reporting.",
      "Data Management: Ensure accurate and secure handling of transportation data and records.",
    ],
    continuousImprovement: [
      "Feedback Collection: Gather feedback from clients, drivers, and other stakeholders to identify areas for improvement.",
      "Process Optimization: Implement improvements based on feedback and performance reviews.",
    ],
    routePlanning: [
      "Plan and create efficient delivery routes for all orders.",
      "Optimize routes based on delivery addresses, traffic conditions, and delivery time windows.",
      "Ensure routes minimize fuel consumption and delivery time.",
    ],
    coordinateWithDeliveryTeam: [
      "Communicate planned routes with the delivery team.",
      "Provide necessary details and instructions for each route in order to inform the customers.",
    ],
    enterRouteInformation: [
      "Input all relevant route details into Airtable (e.g., delivery addresses, route specifics, delivery times).",
      "Ensure accuracy and completeness of the route data.",
    ],
    updateDeliveryDates: [
      "Enter estimated delivery dates and times into Airtable.",
      "Update any changes to delivery schedules promptly.",
    ],
    notifyRelevantDepartments: [
      "Share route and delivery information with all relevant departments using Airtable.",
      "Ensure departments are aware of their responsibilities and any changes in delivery schedules.",
    ],
    creatingLabelsForWarranty: [
      "Access FedEx shipping tools or software to generate warranty labels.",
      "Ensure that each label includes accurate shipping information and warranty details.",
      "Print and attach labels to warranty shipments.",
      "Double-check that all details on the warranty labels are correct.",
      "Arrange for FedEx pickups through their website or shipping software.",
    ],
  },
  "Shipping Assistant ": {
    customerAddressVerification: [
      "Contact customers to confirm their delivery addresses.",
      "Update any incorrect or incomplete address details.",
      "Update Information in Airtable.",
      "Enter verified address details into Airtable.",
      "Ensure all address information is accurate and up-to-date.",
    ],
    informCustomersAboutTheirOrders: [
      "Call customers to provide updates regarding their order status.",
      "Communicate any changes or delays in the delivery schedule.",
    ],
    recordUpdateInformationInAirtable: [
      "Log all customer interactions and order updates in Airtable.",
      "Ensure records are current and reflect the latest information.",
    ],
    organizeDeliveryTimesWithTransportationDepartment: [
      "Coordinate delivery times and schedules with the transportation department.",
      "Ensure that delivery windows align with transportation availability.",
    ],
    scheduleMeetingsWithTransportationDepartment: [
      "Hold regular meetings with the transportation department to review schedules and updates.",
      "Ensure both teams are aligned on delivery plans and any changes.",
    ],
    respondToCustomerCareEmails: [
      "Answer emails from customers regarding their orders or delivery issues.",
      "Provide accurate and timely information based on the latest updates.",
    ],
    callDriversForGuidanceAndConfirmation: [
      "Contact drivers to provide guidance to their delivery locations.",
      "Confirm the delivery schedule and ensure drivers are prepared for their routes.",
      "Check with drivers to confirm their availability and readiness for scheduled deliveries.",
    ],
    documentCustomerInteractions: [
      "Record details of all customer calls and interactions in Airtable.",
      "Update any changes in delivery schedules or addresses.",
    ],
    followUpOnPendingIssues: [
      "Monitor any pending issues or unresolved customer concerns.",
      "Ensure follow-up actions are completed and documented.",
    ],
    communication: [
      "Notify customers of their order status (processing, shipped, or delayed).",
      "Provide tracking information to customers.",
      "Address and resolve any shipping-related inquiries or issues.",
    ],
    recordKeeping: [
      "Maintain accurate records of all shipped orders.",
      "Track shipping costs and monitor for discrepancies.",
      "Ensure proper documentation is filed for future reference.",
    ],
    continuousImprovement: [
      "Review shipping processes regularly for efficiency.",
      "Collect and analyze customer feedback on shipping and delivery.",
      "Implement changes based on feedback and performance metrics.",
    ],
  },
  "Dispatcher ": {
    dailyPreparations: [
      "Review schedule and shift assignments.",
      "Check communication equipment and systems for functionality.",
      "Verify emergency protocols and contact information.",
    ],
    vehicleAndEquipmentChecks: [
      "Ensure all vehicles are in operational condition.",
      "Confirm maintenance records are up-to-date.",
      "Verify that all equipment (e.g., GPS, radios) is working properly.",
    ],
    communication: [
      "Establish clear channels of communication with team members.",
      "Ensure all team members are informed of their duties and any changes.",
      "Monitor radio channels and communication systems for updates.",
    ],
    incidentManagement: [
      "Prioritize and assign tasks based on urgency.",
      "Track and log incidents and responses.",
      "Coordinate with emergency services if needed.",
    ],
    documentation: [
      "Maintain accurate logs of all dispatch activities.",
      "Update records of vehicle movements and assignments.",
      "File reports on incidents and operations as required.",
    ],
    customerInteraction: [
      "Address customer inquiries and concerns promptly.",
      "Ensure accurate and timely information is provided to customers.",
      "Follow up on service requests and issues.",
    ],
    safetyAndCompliance: [
      "Ensure compliance with safety regulations and company policies.",
      "Monitor and address any safety hazards or concerns.",
      "Keep updated on regulatory changes affecting operations.",
    ],
    endOfShiftProcedures: [
      "Review and hand over any unresolved issues or tasks to the next shift.",
      "Update records and documentation.",
      "Conduct a brief debriefing with the team to discuss any issues or improvements.",
    ],
    continuousImprovement: [
      "Analyze performance metrics and feedback.",
      "Identify areas for improvement in processes and procedures.",
      "Implement training or changes as needed.",
    ],
  },"Web Development": {
    dailyWebsiteMonitoring: [
      "Review the website for any issues.",
      "Verify that all prices and product information are accurate and up-to-date.",
    ],
    websiteDesignAndDevelopment: [
      "Design Websites for Ongoing Projects",
      "Develop and design website elements according to the current project requirements.",
      "Ensure design aligns with project goals.",
    ],
    researchToolsForFeatureDevelopment: [
      "Investigate and evaluate tools that can enhance website features.",
      "Stay updated on emerging technologies and trends for website development.",
      "Collaborate with Hector to review and implement any necessary changes to the website.",
      "Discuss and prioritize changes based on project needs and feedback.",
      "Coordinate with the marketing team to align website design and functionality with marketing strategies.",
      "Implement marketing recommendations and updates on the website.",
    ],
    provideWebsiteImprovementRecommendations: [
      "Analyze the website's performance and user experience.",
      "Suggest improvements and optimizations for better functionality and user engagement.",
    ],
    designFormsForDepartments: [
      "Create and design forms as needed for different departments.",
      "Ensure forms are user-friendly and meet departmental requirements.",
    ],
    websiteMaintenanceAndRepairs: [
      "Address and fix any issues or bugs on the website.",
      "Ensure website stability and functionality through regular maintenance.",
    ],
  },"Sales Support": {
    dailySalesEmailReview: [
      "Review Sales Emails Daily",
      "Check and respond to sales emails.",
      "Follow up on any pending issues or inquiries.",
    ],
    supportForCEO: [
      "Provide Direct Support to the CEO",
      "Assist with any activities or tasks required by the CEO.",
      "Prioritize and execute tasks as directed by the CEO.",
    ],
    estimateAndInvoiceManagement: [
      "Prepare and issue estimates for potential projects or sales.",
      "Ensure accuracy and detail in estimates.",
      "Generate and send invoices for completed sales or services.",
      "Verify that invoices are accurate and complete.",
      "Monitor the status of sent estimates and invoices.",
      "Follow up with customers to ensure timely responses and payments.",
    ],
    customerAssistance: [
      "Make Calls, Assistance, and Support.",
      "Assist existing and potential customers with inquiries and support via email.",
    ],
    databaseManagement: [
      "Maintain and update CRM and Airtable databases.",
      "Ensure data accuracy and completeness.",
      "Gather and organize data for new database creation.",
      "Ensure data is accurate and relevant.",
    ],
    shippingLabelCreation: [
      "Prepare and print shipping labels for outgoing orders when necessary.",
      "Ensure accuracy in shipping details.",
    ],
    appointmentManagement: [
      "Manage Reminders and Appointments",
      "Inform the CEO of upcoming appointments and ensure reminders are set.",
    ],
    meetingDocumentation: [
      "Document Key Points During Meetings.",
      "Take detailed notes during meetings.",
      "Ensure clear and accurate documentation of key points.",
    ],
    accountsReceivableManagement: [
      "Oversee the database of accounts receivable.",
      "Make calls and send emails to customers regarding outstanding payments.",
      "Update information in Airtable as needed.",
    ],
  },"Purchasing Assistant": {
    dailyOrderEmailReview: [
      "Check and respond to emails related to orders.",
      "Follow up on any pending order issues or inquiries.",
    ],
    creationOfPurchaseOrders: [
      "Generate and issue purchase orders for required products.",
      "Ensure purchase orders include accurate product details and quantities.",
    ],
    supplierPurchasing: [
      "Purchase products from suppliers via online platforms and direct contact.",
      "Confirm product availability and pricing with suppliers.",
    ],
    supplierFollowUp: [
      "Confirm or adjust orders as necessary.",
      "Track orders and ensure they are delivered on time.",
      "Contact suppliers for order updates, confirmations, or issues.",
      "Address any concerns or discrepancies with orders.",
    ],
    stockLevelMonitoring: [
      "Regularly check inventory levels in the warehouse.",
      "Determine when and what products need to be reordered.",
    ],
    supplierInquiry: [
      "Research and contact potential new suppliers.",
      "Evaluate potential suppliers for product quality and pricing.",
      "Assist with various aspects of the ordering process as needed.",
      "Ensure smooth execution of purchase orders and supplier transactions.",
    ],
    databaseMaintenance: [
      "Update and manage order details in the internal database.",
      "Record important information such as order dates, suppliers, quantities, and discounts.",
      "Oversee the management of systems and software (e.g., BigCommerce, QuickBooks, Airtable).",
    ],
    invoicingManagement: [
      "Ensure invoices are current in systems such as QuickBooks and Airtable.",
      "Verify accuracy and completeness of invoice records.",
      "Regularly review and update product and purchase costs.",
      "Adjust pricing and budget forecasts based on cost changes.",
    ],
  },"Customer Support": {
    customerInquiriesAndSupport: [
      "Answer Inbound Calls",
      "Respond to incoming calls from customers.",
      "Address inquiries ranging from order placement to order status.",
      "Assist with Customer Inquiries.",
      "Help customers with questions or issues related to their orders.",
      "Provide accurate and timely information.",
      "Coordinate with remote team members to gather answers and solutions.",
      "Use Airtable for effective communication and updates.",
    ],
    conductFollowUpCalls: [
      "Reach out to customers who have received their orders to ensure satisfaction.",
      "Contact customers who have not received their orders to provide updates on delivery.",
    ],
    crmAndSalesResearch: [
      "Use CRM (Airtable) to identify previous customers and their purchase history.",
      "Solicit information about available products they may not be aware of.",
      "Rate Interactions.",
      "Evaluate and rate customer interactions based on gathered information (5 stars scale).",
    ],
    administrativeTasks: [
      "Generate and issue invoices for customer orders.",
      "Ensure accuracy and completeness of invoice details.",
      "Research Customer Information in Airtable.",
      "Look up and verify customer details and order history in Airtable.",
      "Update and maintain customer records as necessary.",
    ],
    timeAndOrganizationalManagement: [
      "Manage Time Effectively",
      "Prioritize tasks and manage time to handle customer inquiries and follow-ups efficiently.",
      "Balance multiple responsibilities effectively.",
      "Keep records and information organized for easy access and retrieval.",
      "Ensure that tasks are completed in a systematic and orderly manner.",
    ],
    researchPotentialCustomers: [
      "Define and understand the target market for potential customers.",
      "Gather information on industries, companies, and individuals that fit the target profile.",
      "Use available tools and databases to collect contact information for potential customers.",
      "Call potential customers according to the outreach plan.",
    ],
  },"Warehouse Manager": {
    inventoryManagement: [
      "Regularly check and maintain inventory levels.",
      "Ensure adequate stock levels to meet demand and avoid shortages.",
      "Perform periodic physical counts of inventory.",
      "Reconcile physical counts with system records.",
      "Manage Stock Replenishment.",
      "Plan and order stock based on inventory levels and sales forecasts.",
      "Coordinate with suppliers to ensure timely replenishment.",
    ],
    warehouseOperations: [
      "Oversee Daily Operations.",
      "Supervise daily warehouse activities, including receiving, storing, and shipping goods.",
      "Ensure smooth and efficient warehouse operations.",
      "Implement and Enforce Procedures.",
      "Develop and enforce standard operating procedures for warehouse processes.",
      "Ensure compliance with safety and quality standards.",
      "Organize and optimize warehouse layout for efficient storage and retrieval.",
      "Ensure proper labeling and organization of storage areas.",
    ],
    staffManagement: [
      "Supervise Warehouse Staff.",
      "Oversee and manage warehouse employees.",
      "Assign tasks and monitor performance.",
    ],
    safetyAndMaintenance: [
      "Oversee maintenance and repair of warehouse equipment.",
      "Schedule regular maintenance checks.",
    ],
    shippingAndReceiving: [
      "Oversee Receiving and Inspection.",
      "Manage the receiving process for incoming shipments.",
      "Inspect goods for accuracy and quality upon receipt.",
      "Coordinate Shipping Activities.",
      "Manage the picking, packing, and shipping of orders.",
      "Ensure timely and accurate fulfillment of customer orders.",
      "Handle Returns and Exchanges.",
      "Manage returns and exchanges according to company policy.",
      "Process returned goods and update inventory records.",
    ],
    reportingAndDocumentation: [
      "Generate Reports.",
      "Prepare and submit reports on inventory levels, warehouse operations, and performance metrics.",
      "Analyze data to identify trends and areas for improvement.",
      "Maintain Documentation.",
      "Keep accurate records of inventory, shipments, and warehouse activities.",
      "Ensure all documentation is up-to-date and accessible.",
    ],
    continuousImprovement: [
      "Evaluate Processes.",
      "Review and assess warehouse processes for efficiency and effectiveness.",
      "Implement improvements and innovations to enhance operations.",
    ],
    regularMeetings: [
      "Coordinate a meeting with remote team members to discuss any updates related to the warehouse.",
    ],
  },"Graphic Designer": {
    createLogosOrImagesForAdvertisingCampaigns: [
      "Develop logos and graphics as per campaign requirements.",
      "Ensure designs align with brand guidelines and campaign objectives.",
      "Review and Finalize Designs.",
      "Seek feedback on designs and make necessary revisions.",
      "Finalize and prepare files for use in campaigns.",
    ],
    reviewEstimates: [
      "Prepare detailed estimates for upcoming projects or services.",
      "Ensure accuracy and clarity in the estimates provided.",
      "Verify Estimates.",
    ],
    dailyReviews: [
      "Check daily for any updates or changes to estimates.",
      "Address any discrepancies or issues identified.",
      "Review Airtable Databases.",
      "Monitor and update Airtable databases daily.",
      "Ensure data accuracy and completeness.",
    ],
    createTheCompanyCatalog: [
      "Compile Catalog Information.",
      "Gather and organize information about company products or services.",
      "Create and format the catalog to highlight key offerings.",
      "Design and Produce Catalog.",
      "Design the layout and visual elements of the catalog.",
      "Finalize and produce the catalog for distribution.",
    ],
    editVideosForTheCompany: [
      "Review Video Footage:",
      "Evaluate video footage for quality and relevance.",
      "Select and organize clips for editing.",
      "Use video editing software to edit and enhance footage.",
      "Add graphics, text, and audio as needed.",
    ],
  },"FullStack Developer": {
    automateAirtableProcesses: [
      "Create and implement automation workflows in Airtable to streamline processes.",
      "Ensure automation improves data accuracy and efficiency.",
      "Test and Refine Automations:",
      "Test automated workflows to ensure they function correctly.",
      "Make adjustments as needed based on performance and feedback.",
    ],
    improveWebsiteData: [
      "Analyze and Manage Website Data:",
      "Review and analyze data to identify areas for website improvement.",
      "Provide insights and recommendations for enhancing website functionality and content.",
      "Implement Data Enhancements:",
      "Make data-driven adjustments to improve the website’s performance and user experience.",
    ],
    assistWithProgramRepairs: [
      "Identify and resolve issues with Airtable programs.",
      "Provide support and solutions to ensure Airtable operates smoothly.",
      "Assist with QuickBooks Repairs.",
      "Address and resolve issues with QuickBooks software.",
      "Ensure QuickBooks is functioning correctly and accurately.",
    ],
    maintainWebsiteUpdates: [
      "Check and update the company website to reflect current prices and product codes.",
      "Ensure all website information is accurate and up-to-date.",
      "Regularly review the website for any required updates or corrections.",
      "Coordinate with relevant teams to implement necessary changes.",
    ],
  },"Inside Sales Rep": {
    identifyingSalesOpportunities: [
      "Research and Identify Leads.",
      "Conduct market research to identify potential sales opportunities.",
      "Use various sources such as online databases, networking, and industry events to find prospects.",
      "Develop and Maintain a Sales Pipeline.",
      "Build and manage a robust pipeline of potential clients.",
      "Regularly update and maintain records of leads and prospects.",
    ],
    buildingAndMaintainingClientRelationships: [
      "Engage with Prospective Clients.",
      "Initiate contact with potential customers through calls, emails, and meetings.",
      "Understand client needs and tailor product or service offerings accordingly.",
      "Cultivate Long-term Relationships.",
      "Build and maintain strong relationships with existing clients.",
      "Provide exceptional customer service to ensure client satisfaction and retention.",
    ],
    conductingSalesPresentations: [
      "Deliver Product Presentations.",
      "Prepare and deliver compelling presentations and demonstrations to showcase products or services.",
      "Highlight key features, benefits, and value propositions to prospective clients.",
      "Address Customer Queries.",
      "Respond to client inquiries and concerns promptly.",
      "Provide detailed information and address any objections or hesitations.",
    ],
    negotiatingAndClosingSales: [
      "Negotiate Terms and Conditions.",
      "Discuss pricing, terms, and conditions with clients to reach mutually beneficial agreements.",
      "Prepare and present sales proposals and contracts.",
      "Close Sales Deals.",
      "Finalize sales agreements and secure client commitments.",
      "Ensure all documentation is completed accurately and promptly.",
    ],
    achievingSalesTargets: [
      "Set and Meet Sales Goals.",
      "Establish and work towards achieving individual and team sales targets.",
      "Monitor progress and adjust strategies to ensure goals are met or exceeded.",
      "Analyze Sales Performance.",
      "Track sales metrics and analyze performance data.",
      "Identify areas for improvement and implement corrective actions.",
    ],
    reportingAndDocumentation: [
      "Maintain Sales Records.",
      "Document sales activities, customer interactions, and deal progress.",
      "Use CRM systems to track leads, opportunities, and client information.",
      "Prepare Sales Reports.",
      "Generate regular sales reports and provide insights to management.",
      "Share updates on sales performance, challenges, and opportunities.",
    ],
    continuousLearningAndImprovement: [
      "Keep up-to-date with industry developments, market trends, and competitors.",
      "Continuously improve product knowledge and sales techniques.",
      "Attend Training and Workshops.",
      "Participate in sales training programs and workshops to enhance skills.",
      "Share knowledge and best practices with the sales team.",
    ],
  },
};
Array.from(Object.keys(roles)).forEach((el) => {
    document.getElementById("role").add(new Option(el,el));
});

   

document.querySelectorAll("input[type=checkbox]").forEach(box => {
    box.checked && call_formData.append(`${box.name}`, `${box.value}`) , progressNum = `${box.value}`
})
let objectt = Object.values(roles)
console.log("array",Array.from(objectt))
for (const item of objectt) {
    console.log("item :", `Key: ${item}, Value: ${JSON.stringify(item)}`)
}
console.log(Object.values(roles))
console.log(Object.keys(roles),Object.values(roles),call_form_,document.querySelectorAll("input[type=checkbox]"))


// const updateTask = (role) => {
//   const departmentSelect = document.getElementById("department");
//   const nameSelect = document.getElementById("name");
//   const selectedDepartment = departmentSelect.value;

//   // Clear previous options
//   nameSelect.innerHTML = '<option value="">Select a name</option>';

//   roles[role].forEach((name) => {
//     nameSelect.add(new Option(name, name));
//   });
// };
