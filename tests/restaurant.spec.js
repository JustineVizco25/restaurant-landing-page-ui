import { expect, test } from '@playwright/test'

test('pages have a main landmark, one heading, image alternatives, and working layouts', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const path of ['/', '/menu', '/fine-dining', '/about-us', '/contacts', '/reservation', '/order', '/missing-page']) {
    await page.goto(path)
    await expect(page.getByRole('main')).toHaveCount(1)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.locator('a button, button a, img:not([alt])')).toHaveCount(0)
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    expect(overflowing, `${path} should fit the viewport`).toBe(false)
  }
  expect(errors).toEqual([])
})

test('menu categories are addressable and invalid categories recover', async ({ page }) => {
  await page.goto('/menu')
  const categories = page.getByRole('navigation', { name: 'Menu categories' })
  for (const [label, slug, dish] of [
    ['Homestyle Sushi', 'homestyle-sushi', 'SALMON AVOCADO ROLL'],
    ['Steak', 'steak', 'MISO BUTTER RIBEYE'],
    ['With Rice', 'with-rice', 'TERIYAKI SALMON BOWL'],
    ['Cocktails', 'cocktails', 'YUZU MARTINI'],
    ['Wine', 'wine', 'CHARDONNAY'],
    ['Appetizer', 'appetizer', 'PORK GYOZA'],
    ['Specialities', 'specialties', 'DRAGON SUSHI'],
  ]) {
    await categories.getByRole('link', { name: label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`/menu/${slug}#quality-food$`))
    await expect(page.locator('.food-menu-container')).toContainText(dish)
    await expect(categories.getByRole('link', { name: label, exact: true })).toHaveAttribute('aria-current', 'page')
  }
  await page.goto('/menu/not-a-category')
  await expect(page).toHaveURL(/\/menu$/)
  await expect(page.locator('.food-menu-container')).toContainText('DRAGON SUSHI')
})

test('each special opens its own order and browser back returns to the menu', async ({ page }) => {
  for (const [index, dish] of ['Tuna Sushi', 'Salmon Sushi', 'Just Sushi'].entries()) {
    await page.goto('/menu')
    await page.locator('.order-now-btn').nth(index).click()
    await expect(page).toHaveURL(/\/order$/)
    await expect(page.locator('.food-heading h2')).toHaveText(dish)
    await page.goBack()
    await expect(page).toHaveURL(/\/menu$/)
  }
})

test('cart keeps dishes and notes separate, calculates totals, and removes items', async ({ page }) => {
  await page.goto('/order')
  await expect(page.getByRole('button', { name: 'CONTINUE TO PICKUP' })).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled()
  await page.getByRole('button', { name: 'Increase quantity' }).click()
  await page.getByLabel('Preparation notes').fill('Sauce on the side')
  await page.getByRole('button', { name: 'ADD TO ORDER' }).click()
  await expect(page.locator('.order-cart-row')).toContainText('2 × Tuna Sushi')
  await expect(page.locator('.order-cart-row')).toContainText('Sauce on the side')
  await expect(page.getByLabel('Preparation notes')).toHaveValue('')
  await expect(page.getByLabel('Quantity', { exact: true })).toHaveText('1')
  await page.getByRole('button', { name: 'Salmon Sushi', exact: true }).click()
  await page.getByRole('button', { name: 'ADD TO ORDER' }).click()
  await page.getByRole('button', { name: 'Just Sushi', exact: true }).click()
  await expect(page.locator('.food-heading > span')).toHaveText('$34.00')
  await page.getByRole('button', { name: 'ADD TO ORDER' }).click()
  await page.getByRole('button', { name: 'Tuna Sushi', exact: true }).click()
  await page.getByLabel('Preparation notes').fill('No wasabi')
  await page.getByRole('button', { name: 'ADD TO ORDER' }).click()
  await expect(page.locator('.order-cart-row')).toHaveCount(4)
  await expect(page.locator('.order-count')).toHaveText('5')
  await expect(page.locator('.order-totals')).toContainText('$144.00')
  await page.getByRole('button', { name: 'Remove Salmon Sushi', exact: true }).click()
  await expect(page.locator('.order-totals')).toContainText('$118.00')
  await expect(page.locator('.order-count')).toHaveText('4')
})

test('pickup rejects invalid phones, preserves edits, confirms, and resets', async ({ page }) => {
  await page.goto('/order')
  await page.getByRole('button', { name: 'ADD TO ORDER' }).click()
  await page.getByRole('button', { name: 'CONTINUE TO PICKUP' }).click()
  await expect(page.getByRole('button', { name: 'ADD TO ORDER' })).toBeDisabled()
  await page.getByRole('button', { name: 'PREVIEW CONFIRMATION' }).click()
  await expect(page.locator('.pickup-form')).toBeVisible()
  await page.getByLabel('Pickup name').fill('Alex Rivera')
  for (const invalidPhone of ['abc', '       ', '12345', '1234567890123456']) {
    await page.getByLabel('Phone number').fill(invalidPhone)
    await page.getByRole('button', { name: 'PREVIEW CONFIRMATION' }).click()
    await expect(page.getByRole('alert')).toContainText('7–15 digits')
    await expect(page.getByLabel('Phone number')).toBeFocused()
  }
  await page.getByLabel('Phone number').fill('+63 (917) 123-4567')
  await page.getByRole('button', { name: 'Back to your order' }).click()
  await page.getByRole('button', { name: 'CONTINUE TO PICKUP' }).click()
  await expect(page.getByLabel('Pickup name')).toHaveValue('Alex Rivera')
  await expect(page.getByLabel('Phone number')).toHaveValue('+63 (917) 123-4567')
  await page.getByRole('button', { name: 'PREVIEW CONFIRMATION' }).click()
  await expect(page.locator('.order-confirmation')).toContainText('Alex Rivera')
  await expect(page.locator('.order-confirmation')).toContainText('No order was placed')
  await expect(page.locator('.order-remove')).toHaveCount(0)
  await page.getByRole('button', { name: 'START A NEW ORDER' }).click()
  await expect(page.locator('.order-count')).toHaveText('0')
  await expect(page.getByRole('button', { name: 'CONTINUE TO PICKUP' })).toBeDisabled()
})

test('reservation validates, reviews, preserves edits, and starts fresh', async ({ page }) => {
  await page.goto('/reservation')
  await expect(page.getByLabel('Party size')).toHaveValue('2')
  await expect(page.getByRole('radio', { name: '18:30' })).toBeChecked()
  await page.getByRole('button', { name: 'REVIEW RESERVATION' }).click()
  await expect(page.locator('.form-field')).toBeVisible()
  await page.getByLabel('Full name').fill('   ')
  expect(await page.getByLabel('Full name').evaluate((input) => input.checkValidity())).toBe(false)
  await page.getByLabel('Full name').fill('Jamie Santos')
  await page.getByLabel('Email address').fill('bad-email')
  expect(await page.getByLabel('Email address').evaluate((input) => input.checkValidity())).toBe(false)
  await page.getByLabel('Email address').fill('jamie@example.com')
  await page.getByLabel('Date', { exact: true }).fill('2000-01-01')
  expect(await page.getByLabel('Date', { exact: true }).evaluate((input) => input.validity.rangeUnderflow)).toBe(true)
  const visitDate = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10)
  await page.getByLabel('Date', { exact: true }).fill(visitDate)
  await page.getByLabel('Party size').selectOption('1')
  await page.getByRole('radio', { name: '19:00' }).check()
  await page.getByLabel('Anything we should know?').fill('Window seat, please')
  await page.getByRole('button', { name: 'REVIEW RESERVATION' }).click()
  await expect(page.locator('.reservation-details')).toContainText('1 guest · 19:00')
  await expect(page.locator('.reservation-details')).toContainText('Window seat, please')
  await page.getByRole('button', { name: 'Edit details' }).click()
  await expect(page.getByLabel('Full name')).toHaveValue('Jamie Santos')
  await expect(page.getByRole('radio', { name: '19:00' })).toBeChecked()
  await page.getByRole('button', { name: 'REVIEW RESERVATION' }).click()
  await page.getByRole('button', { name: 'PREVIEW CONFIRMATION' }).click()
  await expect(page.locator('.reservation-tagline')).toContainText('No reservation was sent')
  await page.getByRole('button', { name: 'TRY ANOTHER RESERVATION' }).click()
  await expect(page.getByLabel('Full name')).toHaveValue('')
  await expect(page.getByRole('radio', { name: '18:30' })).toBeChecked()
})

test('contact links, flow switching, legacy preview, and the 404 recover correctly', async ({ page }) => {
  await page.goto('/contacts')
  await page.getByRole('link', { name: 'RESERVE A TABLE', exact: true }).click()
  await expect(page).toHaveURL(/\/reservation$/)
  await page.getByLabel('Full name').fill('Temporary guest')
  await page.getByRole('button', { name: 'Order Now', exact: true }).click()
  await page.getByRole('button', { name: 'Reservation', exact: true }).click()
  await expect(page.getByLabel('Full name')).toHaveValue('')
  await page.getByRole('link', { name: 'Back to restaurant' }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/preview')
  await expect(page).toHaveURL(/\/reservation$/)
  await page.goto('/missing-page')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText("That page isn't on the menu.")
  await page.getByRole('link', { name: 'BACK TO RESTAURANT' }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('private and corporate event selections display the corresponding packages', async ({ page }) => {
  await page.goto('/fine-dining')
  await page.getByRole('button', { name: 'Corporate Events' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Corporate Events')
  await expect(page.locator('.dining-events-menu')).toContainText('EXECUTIVE DINING')
  await expect(page.locator('.dining-events-menu')).toContainText('CORPORATE RECEPTIONS')
  await page.getByRole('button', { name: 'Private Events' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dining Events')
  await expect(page.locator('.dining-events-menu')).toContainText('GOLD DINING')
})
