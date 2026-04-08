import 'dotenv/config';
import { db } from './index';
import { categories, providers, providerCategories, services } from './schema';

async function main() {
  console.log('--- Database Seeding Started ---');

  try {
    // 1. Clear existing data in reverse order of dependency
    console.log('Clearing existing data...');
    await db.delete(services);
    await db.delete(providerCategories);
    await db.delete(providers);
    await db.delete(categories);

    // 2. Insert Categories
    console.log('Inserting categories...');
    const insertedCategories = await db.insert(categories).values([
      {
        name: 'Phone Repair',
        slug: 'phone-repair',
        description: 'Professional phone screen, battery, and component repairs for all major brands.',
      },
      {
        name: 'Laptop Repair',
        slug: 'laptop-repair',
        description: 'Expert laptop diagnostics, screen replacement, hardware upgrades, and software troubleshooting.',
      },
      {
        name: 'Appliance Repair',
        slug: 'appliance-repair',
        description: 'Reliable repair services for household appliances including washing machines, fridges, and ovens.',
      },
      {
        name: 'Clothing Alteration',
        slug: 'clothing-alteration',
        description: 'Quality tailoring and alteration services for all types of clothing and fabric items.',
      },
      {
        name: 'Bicycle Repair',
        slug: 'bicycle-repair',
        description: 'Complete bicycle servicing, brake adjustments, tyre replacements, and tune-ups.',
      },
    ]).returning();

    // Map categories by slug for easy lookup
    const categoryMap = Object.fromEntries(
      insertedCategories.map((c) => [c.slug, c.id])
    );

    // 3. Insert Providers
    console.log('Inserting providers...');
    const insertedProviders = await db.insert(providers).values([
      {
        businessName: 'FixIt Phone Lab',
        contactName: 'James Chen',
        email: 'james@fixitphonelab.com.au',
        phone: '0412 345 678',
        suburb: 'Brisbane City',
        serviceArea: 'Brisbane City, Fortitude Valley, South Bank',
        description: 'Fast and affordable phone repairs. Screen replacements in 30 minutes for most models.',
        status: 'active',
        isFeatured: true,
        mapLocationText: 'Brisbane City, QLD 4000',
      },
      {
        businessName: 'Mobile Medics Brisbane',
        contactName: 'Sarah Park',
        email: 'info@mobilemedics.com.au',
        phone: '0423 456 789',
        suburb: 'Fortitude Valley',
        serviceArea: 'Fortitude Valley, New Farm, Teneriffe',
        description: 'We come to you. Mobile phone repair service across inner Brisbane suburbs.',
        status: 'active',
        isFeatured: false,
        mapLocationText: 'Fortitude Valley, QLD 4006',
      },
      {
        businessName: 'Brisbane Laptop Pros',
        contactName: 'David Wilson',
        email: 'david@laptoppros.com.au',
        phone: '0434 567 890',
        suburb: 'West End',
        serviceArea: 'West End, South Brisbane, Highgate Hill',
        description: 'Expert laptop repair and upgrades. Free diagnostics on all jobs.',
        status: 'active',
        isFeatured: true,
        mapLocationText: 'West End, QLD 4101',
      },
      {
        businessName: 'TechFix Solutions',
        contactName: 'Michael Lee',
        email: 'support@techfix.com.au',
        phone: '0445 678 901',
        suburb: 'Paddington',
        serviceArea: 'Paddington, Milton, Auchenflower, Toowong',
        description: 'One-stop shop for laptop and phone repairs. Business and personal devices welcome.',
        status: 'active',
        isFeatured: false,
        mapLocationText: 'Paddington, QLD 4064',
      },
      {
        businessName: 'Home Appliance Heroes',
        contactName: 'Emma Brown',
        email: 'emma@applianceheroes.com.au',
        phone: '0456 789 012',
        suburb: 'Woolloongabba',
        serviceArea: 'Woolloongabba, Coorparoo, Greenslopes, Annerley',
        description: 'Same-day appliance repairs for fridges, ovens, washers, and dryers.',
        status: 'active',
        isFeatured: true,
        mapLocationText: 'Woolloongabba, QLD 4102',
      },
      {
        businessName: 'QuickStitch Alterations',
        contactName: 'Lisa Nguyen',
        email: 'lisa@quickstitch.com.au',
        phone: '0467 890 123',
        suburb: 'Chermside',
        serviceArea: 'Chermside, Kedron, Stafford',
        description: 'Professional tailoring and clothing alterations. Express service available.',
        status: 'active',
        isFeatured: false,
        mapLocationText: 'Chermside, QLD 4032',
      },
      {
        businessName: 'Brisbane Bike Workshop',
        contactName: 'Tom Harris',
        email: 'tom@brisbanebike.com.au',
        phone: '0478 901 234',
        suburb: 'New Farm',
        serviceArea: 'New Farm, Teneriffe, Newstead, Bowen Hills',
        description: 'Full-service bike shop. Tune-ups, repairs, and custom builds.',
        status: 'active',
        isFeatured: false,
        mapLocationText: 'New Farm, QLD 4005',
      },
      {
        businessName: 'Pedal Power Repairs',
        contactName: 'Amy Zhang',
        email: 'amy@pedalpower.com.au',
        phone: '0489 012 345',
        suburb: 'Indooroopilly',
        serviceArea: 'Indooroopilly, St Lucia, Taringa, Toowong',
        description: 'Specialising in road and mountain bike repairs. Quick turnaround.',
        status: 'active',
        isFeatured: false,
        mapLocationText: 'Indooroopilly, QLD 4068',
      },
    ]).returning();

    // Map providers by name for easy lookup
    const providerMap = Object.fromEntries(
      insertedProviders.map((p) => [p.businessName, p.id])
    );

    // 4. Link Providers to Categories
    console.log('Linking providers to categories...');
    await db.insert(providerCategories).values([
      { providerId: providerMap['FixIt Phone Lab'], categoryId: categoryMap['phone-repair'] },
      { providerId: providerMap['Mobile Medics Brisbane'], categoryId: categoryMap['phone-repair'] },
      { providerId: providerMap['Brisbane Laptop Pros'], categoryId: categoryMap['laptop-repair'] },
      { providerId: providerMap['TechFix Solutions'], categoryId: categoryMap['laptop-repair'] },
      { providerId: providerMap['TechFix Solutions'], categoryId: categoryMap['phone-repair'] },
      { providerId: providerMap['Home Appliance Heroes'], categoryId: categoryMap['appliance-repair'] },
      { providerId: providerMap['QuickStitch Alterations'], categoryId: categoryMap['clothing-alteration'] },
      { providerId: providerMap['Brisbane Bike Workshop'], categoryId: categoryMap['bicycle-repair'] },
      { providerId: providerMap['Pedal Power Repairs'], categoryId: categoryMap['bicycle-repair'] },
    ]);

    // 5. Insert Services
    console.log('Inserting services...');
    await db.insert(services).values([
      // FixIt Phone Lab
      {
        providerId: providerMap['FixIt Phone Lab'],
        name: 'Screen Replacement',
        description: 'Cracked or broken screen replacement for iPhone and Samsung models.',
        priceMethod: 'fixed',
        startingPrice: '89.00',
        estimatedDuration: '30–60 minutes',
      },
      {
        providerId: providerMap['FixIt Phone Lab'],
        name: 'Battery Replacement',
        description: 'Restore your phone battery life with a genuine replacement.',
        priceMethod: 'fixed',
        startingPrice: '59.00',
        estimatedDuration: '20–30 minutes',
      },
      {
        providerId: providerMap['FixIt Phone Lab'],
        name: 'Water Damage Repair',
        description: 'Diagnostic and repair for water-damaged phones.',
        priceMethod: 'quote',
        startingPrice: null,
        estimatedDuration: '1–3 days',
      },
      // Mobile Medics Brisbane
      {
        providerId: providerMap['Mobile Medics Brisbane'],
        name: 'On-Site Screen Repair',
        description: 'We come to your home or office for screen repairs.',
        priceMethod: 'fixed',
        startingPrice: '109.00',
        estimatedDuration: '45–60 minutes',
      },
      {
        providerId: providerMap['Mobile Medics Brisbane'],
        name: 'Charging Port Fix',
        description: 'Repair or replace faulty charging ports.',
        priceMethod: 'fixed',
        startingPrice: '69.00',
        estimatedDuration: '30 minutes',
      },
      // Brisbane Laptop Pros
      {
        providerId: providerMap['Brisbane Laptop Pros'],
        name: 'Laptop Screen Replacement',
        description: 'LCD and LED screen replacements for all brands.',
        priceMethod: 'fixed',
        startingPrice: '149.00',
        estimatedDuration: '1–2 hours',
      },
      {
        providerId: providerMap['Brisbane Laptop Pros'],
        name: 'RAM/SSD Upgrade',
        description: 'Speed up your laptop with a memory or storage upgrade.',
        priceMethod: 'fixed',
        startingPrice: '99.00',
        estimatedDuration: '30–60 minutes',
      },
      {
        providerId: providerMap['Brisbane Laptop Pros'],
        name: 'Full Diagnostic',
        description: 'Complete hardware and software diagnostic report.',
        priceMethod: 'fixed',
        startingPrice: '0.00',
        estimatedDuration: '1 hour',
      },
      // TechFix Solutions
      {
        providerId: providerMap['TechFix Solutions'],
        name: 'General Device Repair',
        description: 'Assessment and repair for laptops and phones.',
        priceMethod: 'quote',
        startingPrice: null,
        estimatedDuration: 'Varies',
      },
      {
        providerId: providerMap['TechFix Solutions'],
        name: 'Data Recovery',
        description: 'Recover lost data from damaged drives or devices.',
        priceMethod: 'quote',
        startingPrice: null,
        estimatedDuration: '2–5 days',
      },
      // Home Appliance Heroes
      {
        providerId: providerMap['Home Appliance Heroes'],
        name: 'Washing Machine Repair',
        description: 'Fix leaks, spin issues, and drainage problems.',
        priceMethod: 'fixed',
        startingPrice: '120.00',
        estimatedDuration: '1–2 hours',
      },
      {
        providerId: providerMap['Home Appliance Heroes'],
        name: 'Fridge Repair',
        description: 'Thermostat, compressor, and seal replacements.',
        priceMethod: 'quote',
        startingPrice: null,
        estimatedDuration: 'Varies',
      },
      {
        providerId: providerMap['Home Appliance Heroes'],
        name: 'Oven/Stove Repair',
        description: 'Element and thermostat repairs for electric and gas ovens.',
        priceMethod: 'fixed',
        startingPrice: '110.00',
        estimatedDuration: '1–2 hours',
      },
      // QuickStitch Alterations
      {
        providerId: providerMap['QuickStitch Alterations'],
        name: 'Hemming',
        description: 'Shorten or lengthen pants, skirts, and dresses.',
        priceMethod: 'fixed',
        startingPrice: '15.00',
        estimatedDuration: '1–2 days',
      },
      {
        providerId: providerMap['QuickStitch Alterations'],
        name: 'Zip Replacement',
        description: 'Replace broken zips on jackets, bags, and pants.',
        priceMethod: 'fixed',
        startingPrice: '25.00',
        estimatedDuration: '2–3 days',
      },
      {
        providerId: providerMap['QuickStitch Alterations'],
        name: 'Custom Fitting',
        description: 'Tailored adjustments to improve garment fit.',
        priceMethod: 'quote',
        startingPrice: null,
        estimatedDuration: '3–5 days',
      },
      // Brisbane Bike Workshop
      {
        providerId: providerMap['Brisbane Bike Workshop'],
        name: 'Basic Tune-Up',
        description: 'Brake and gear adjustment, tyre inflation, chain lube.',
        priceMethod: 'fixed',
        startingPrice: '55.00',
        estimatedDuration: '30 minutes',
      },
      {
        providerId: providerMap['Brisbane Bike Workshop'],
        name: 'Tyre Replacement',
        description: 'New inner tube and tyre fitting.',
        priceMethod: 'fixed',
        startingPrice: '35.00',
        estimatedDuration: '20 minutes',
      },
      {
        providerId: providerMap['Brisbane Bike Workshop'],
        name: 'Full Service',
        description: 'Complete strip-down, clean, adjust, and safety check.',
        priceMethod: 'fixed',
        startingPrice: '120.00',
        estimatedDuration: '2–3 hours',
      },
      // Pedal Power Repairs
      {
        providerId: providerMap['Pedal Power Repairs'],
        name: 'Brake Adjustment',
        description: 'Disc and rim brake adjustments and pad replacements.',
        priceMethod: 'fixed',
        startingPrice: '30.00',
        estimatedDuration: '20 minutes',
      },
      {
        providerId: providerMap['Pedal Power Repairs'],
        name: 'Wheel Truing',
        description: 'Straighten buckled or wobbly wheels.',
        priceMethod: 'fixed',
        startingPrice: '40.00',
        estimatedDuration: '30 minutes',
      },
    ]);

    console.log('Seed complete.');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

main();
