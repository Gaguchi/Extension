import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    scraped_data_set = set()  # We use a set to keep track of already scraped data

    def scrape_page():
        # This function is a python version of your JavaScript scraping logic
        elements = page.query_selector_all('.cd-search-jss216')
        current_data = set()

        for element in elements:
            listing_id = element.get_attribute('data-listing-id')
            price_element = element.query_selector('.cd-search-jss271')
            price = price_element.text_content().strip() if price_element else 'Price not found'
            location_element = element.query_selector('.cd-search-jss310')
            location = location_element.text_content().strip() if location_element else 'Location not found'
            company_name_element = element.query_selector('.cd-search-jss460')
            company_name = company_name_element.text_content().strip() if company_name_element else 'Company name not found'

            data = (listing_id, price, location, company_name)
            current_data.add(data)

        new_data = current_data - scraped_data_set
        for entry in new_data:
            # Here's where you can add your notification logic. For this example, we just print the new data
            print(f"New entry found: ListingID: {entry[0]}, Price: {entry[1]}, Location: {entry[2]}, Company: {entry[3]}")

        scraped_data_set.update(new_data)  # Add current data to scraped data set

    try:
        # Navigate to the login page
        page.goto('https://app.centraldispatch.com/search')

        # Click the "remember my username" button
        remember_button = page.query_selector('input[id="RememberLogin"]')  
        if remember_button:
            remember_button.click()

        # Fill in the username and password
        page.fill('input[type="text"][name="Username"]', 'Transko')  
        page.fill('input[type="password"][name="Password"]', 'Iraklius2021@')  

        # Click the sign-in button
        sign_in_button = page.query_selector('button[id="loginButton"]')  # Replace with the appropriate selector
        if sign_in_button:
            sign_in_button.click()

        # Wait for the page to load after signing in
        page.wait_for_load_state('load')  # You can adjust the load state (e.g., 'domcontentloaded', 'networkidle') as per your need

        # Now continue with your scraping logic
        while True:
            scrape_page()
            page.reload()
            time.sleep(10)

    finally:
        browser.close()

# Entry point
with sync_playwright() as p:
    run(p)
