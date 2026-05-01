#!/usr/bin/env node

const { Pinchtab } = require('pinchtab/dist/src/index.js');

async function visitFeeta() {
  const pinchtab = new Pinchtab();

  try {
    console.log('Starting Pinchtab...');
    await pinchtab.start();
    console.log('Pinchtab started successfully');

    console.log('Creating new tab for feeta-ai.com...');
    const tab = await pinchtab.createTab({
      url: 'https://feeta-ai.com'
    });
    console.log('Tab created:', tab);

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('Taking snapshot of hero section...');
    const snapshot = await pinchtab.snapshot({
      selector: 'body',
      format: 'markdown'
    });
    console.log('Snapshot:');
    console.log(snapshot);

    // Take screenshot
    console.log('Taking screenshot...');
    const screenshot = await pinchtab.snapshot({
      selector: 'body',
      format: 'image'
    });
    console.log('Screenshot data length:', screenshot?.data?.length || 'no data');

    // Look for announcement pill specifically
    console.log('\nLooking for announcement pill...');
    const pillSnapshot = await pinchtab.snapshot({
      selector: '[class*="pill"], [class*="announcement"], [class*="badge"]',
      format: 'markdown'
    });
    console.log('Pill snapshot:', pillSnapshot);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Stopping Pinchtab...');
    await pinchtab.stop();
    console.log('Pinchtab stopped');
  }
}

visitFeeta();
