#!/usr/bin/env node

const { Pinchtab } = require('pinchtab/dist/src/index.js');

async function scrollPage() {
  const pinchtab = new Pinchtab();

  try {
    console.log('Starting Pinchtab...');
    await pinchtab.start();
    console.log('Pinchtab started successfully');

    console.log('Creating tab for localhost:3000...');
    const tab = await pinchtab.createTab({
      url: 'http://localhost:3000'
    });
    console.log('Tab created');

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Page loaded');

    // Take initial snapshot
    console.log('\n=== Initial Hero Section ===');
    const initialSnapshot = await pinchtab.snapshot({
      selector: 'body',
      format: 'markdown'
    });
    console.log(initialSnapshot);

    // Scroll down gradually
    console.log('\n=== Starting Scroll ===');
    for (let i = 0; i < 5; i++) {
      console.log(`Scrolling... Step ${i + 1}/5`);
      await pinchtab.evaluate({
        code: 'window.scrollBy({ top: 500, behavior: "smooth" });'
      });
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Take snapshot after each scroll
      console.log(`\n=== Snapshot after scroll ${i + 1} ===`);
      const snapshot = await pinchtab.snapshot({
        selector: 'body',
        format: 'markdown'
      });
      console.log(snapshot.substring(0, 500) + '...');
    }

    console.log('\n=== Final Screenshot ===');
    const screenshot = await pinchtab.snapshot({
      selector: 'body',
      format: 'image'
    });
    console.log('Screenshot captured, data length:', screenshot?.data?.length || 'no data');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('\nStopping Pinchtab...');
    await pinchtab.stop();
    console.log('Pinchtab stopped');
  }
}

scrollPage();
