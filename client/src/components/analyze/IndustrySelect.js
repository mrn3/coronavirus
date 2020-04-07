import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { useMainContext } from "../MainContext";

const suggestions = [
  { label: 'Accommodation and Food Services' },
  { label: 'Accommodations' },
  { label: 'Accounting' },
  { label: 'Advertising Agencies' },
  { label: 'Advertising/Public Relations' },
  { label: 'Air Transport' },
  { label: 'Aircraft Maintenance, Repair & Airlines' },
  { label: 'Alcoholic Beverages' },
  { label: 'Alternative Energy Production & Services' },
  { label: 'Alternative Healthcare Providers' },
  { label: 'Alternative Medicine' },
  { label: 'Ambulance Services' },
  { label: 'Amusement Parks' },
  { label: 'Animal Food Production' },
  { label: 'Animation' },
  { label: 'Apartment Rental' },
  { label: 'Apparel/Fashion' },
  { label: 'Appliance Repair' },
  { label: 'Appraisers' },
  { label: 'Architects' },
  { label: 'Art Dealers' },
  { label: 'Athletic & Sporting Goods Manufacturing' },
  { label: 'Attorneys/Law Firms' },
  { label: 'Audio Production Studios' },
  { label: 'Auto Dealers' },
  { label: 'Auto Leasing, Loans & Sales' },
  { label: 'Auto Mechanics' },
  { label: 'Auto Parts Manufacturing' },
  { label: 'Auto Parts Stores' },
  { label: 'Automobile Brakes Manufacturing' },
  { label: 'Automobile Engine & Parts Manufacturing' },
  { label: 'Automobile Steering & Suspension' },
  { label: 'Automobile Towing' },
  { label: 'Automobile Transmission Manufacturing' },
  { label: 'Baking Mix & Prepared Food' },
  { label: 'Ball Bearing Manufacturing' },
  { label: 'Banking, Mortgage' },
  { label: 'Bars & Nightclubs' },
  { label: 'Bars & Restaurants' },
  { label: 'Beauty, Cosmetics & Fragrance' },
  { label: 'Bed & Breakfast & Hostel' },
  { label: 'Beekeeping' },
  { label: 'Beer, Wine & Liquor Stores' },
  { label: 'Bicycle Dealership and Repair' },
  { label: 'Billboard & Outdoor Advertising' },
  { label: 'Billboard & Sign Manufacturing' },
  { label: 'Biotechnology/Greentech' },
  { label: 'Blind & Shade Manufacturing' },
  { label: 'Blood & Organ Banks' },
  { label: 'Boat Dealership and Repair' },
  { label: 'Book Publishing' },
  { label: 'Book Stores' },
  { label: 'Bottled Water Production' },
  { label: 'Bowling Centers' },
  { label: 'Bread Production' },
  { label: 'Breweries' },
  { label: 'Broadcasting' },
  { label: 'Builders/General Contractors' },
  { label: 'Building Finishing Contractors' },
  { label: 'Building Inspectors' },
  { label: 'Building Materials' },
  { label: 'Business Associations' },
  { label: 'Business Certification & IT Schools' },
  { label: 'Business Coaching' },
  { label: 'Business Service Centers' },
  { label: 'Business Services' },
  { label: 'Business Supplies/Equipment' },
  { label: 'Cabinet & Vanity Manufacturing' },
  { label: 'Cable Providers' },
  { label: 'Camera Stores' },
  { label: 'Campgrounds & RV Parks' },
  { label: 'Candy Production' },
  { label: 'Canned Fruit & Vegetable' },
  { label: 'Car Body Shops' },
  { label: 'Car Dealers' },
  { label: 'Car Rental' },
  { label: 'Car Wash & Auto Detailing' },
  { label: 'Carpenters' },
  { label: 'Carpet Cleaning' },
  { label: 'Casinos' },
  { label: 'Caterers' },
  { label: 'Cattle Ranchers/Livestock' },
  { label: 'Celebrity & Sports Agents' },
  { label: 'Cement Manufacturing' },
  { label: 'Cemetery Services' },
  { label: 'Charter Flights' },
  { label: 'Children\'s & Infants\' Clothing Stores' },
  { label: 'Chiropractors' },
  { label: 'Chocolate Production' },
  { label: 'Clay Brick & Product Manufacturing' },
  { label: 'Cleaning' },
  { label: 'Cleanup Services' },
  { label: 'Clergy & Religious Organizations' },
  { label: 'Clinics' },
  { label: 'Clothing Manufacturing' },
  { label: 'Coffee & Snack Shops' },
  { label: 'Coffee Production' },
  { label: 'Colleges & Universities' },
  { label: 'Commercial Leasing' },
  { label: 'Commercial Real Estate' },
  { label: 'Communication Equipment Manufacturing' },
  { label: 'Community Colleges' },
  { label: 'Community Food Services' },
  { label: 'Community Housing & Homeless' },
  { label: 'Computer & Packaged Software' },
  { label: 'Computer & Printer Leasing' },
  { label: 'Computer Games' },
  { label: 'Computer Hardware' },
  { label: 'Computer Manufacturing' },
  { label: 'Computer Networking' },
  { label: 'Computer Software' },
  { label: 'Computer Stores' },
  { label: 'Concert & Event Promotion' },
  { label: 'Concrete Contractors' },
  { label: 'Concrete Pipe & Block Manufacturing' },
  { label: 'Construction Machinery Manufacturing' },
  { label: 'Construction Services' },
  { label: 'Consulting' },
  { label: 'Consumer Electronics' },
  { label: 'Consumer Electronics Stores' },
  { label: 'Consumer Goods' },
  { label: 'Contractors' },
  { label: 'Convenience Stores' },
  { label: 'Copier & Office Equipment Whl.' },
  { label: 'Cosmetic & Beauty Products Manufacturing' },
  { label: 'Cosmetics' },
  { label: 'Costume & Team Uniform Manufacturing' },
  { label: 'Couriers & Local Delivery Services' },
  { label: 'Credit Card Processing & Money' },
  { label: 'Credit Counselors, Surveyors & Credit Unions' },
  { label: 'Cruise Lines' },
  { label: 'Dairy Farms' },
  { label: 'Dairy Product Production' },
  { label: 'Database, Storage & Backup' },
  { label: 'Dating Services' },
  { label: 'Day Care' },
  { label: 'Debt Collection Agencies' },
  { label: 'Demolition & Wrecking' },
  { label: 'Dentists' },
  { label: 'Department Stores' },
  { label: 'Design, Editing & Rendering' },
  { label: 'Direct Mail Advertising' },
  { label: 'Distilleries' },
  { label: 'Doctors & Other Health Professionals' },
  { label: 'Dry Cleaners' },
  { label: 'Dry Docks & Cargo Inspection' },
  { label: 'Drywall & Insulation Installers' },
  { label: 'E-Commerce & Online Auctions' },
  { label: 'Educational Services' },
  { label: 'Elderly & Disabled Services' },
  { label: 'Electrical Equipment Manufacturing' },
  { label: 'Electricians' },
  { label: 'Electronic & Computer Repair' },
  { label: 'Elevator Installation & Service' },
  { label: 'Emergency & Other Outpatient Care' },
  { label: 'Employment & Recruiting Agencies' },
  { label: 'Engine & Turbine Manufacturing' },
  { label: 'Engineering Services' },
  { label: 'Extruding' },
  { label: 'Eye Glasses & Contact Lens Stores' },
  { label: 'Fabric, Craft & Sewing Supplies' },
  { label: 'Family Counseling & Crisis' },
  { label: 'Family Planning & Abortion Clinics' },
  { label: 'Farm, Lawn & Garden Equipment' },
  { label: 'Fashion Designers' },
  { label: 'Fast Food Restaurants' },
  { label: 'Fence Construction' },
  { label: 'Finance and Insurance' },
  { label: 'Financial Planning & Advice' },
  { label: 'Fish & Seafood Markets' },
  { label: 'Fishing' },
  { label: 'Floor Covering Stores' },
  { label: 'Flooring Installers' },
  { label: 'Florists' },
  { label: 'Food & Beverage' },
  { label: 'Food Service Contractors' },
  { label: 'Fruit & Vegetable Markets' },
  { label: 'Funeral Homes' },
  { label: 'Furniture Repair & Reupholstery' },
  { label: 'Furniture Stores' },
  { label: 'Garbage Collection/Waste Management' },
  { label: 'Gas Stations' },
  { label: 'General Contractors' },
  { label: 'Gift Shops & Card Stores' },
  { label: 'Glass & Glazing Contractors' },
  { label: 'Glasses & Contact Lens Manufacturing' },
  { label: 'Golf Courses & Country Clubs' },
  { label: 'Golf Driving Ranges & Family Fun Centers' },
  { label: 'Graphic Design/Web Design' },
  { label: 'Guns & Ammunition Manufacturing' },
  { label: 'Gym & Exercise Equipment Manufacturing' },
  { label: 'Gym, Health & Fitness Clubs' },
  { label: 'Hair & Nail Salons' },
  { label: 'Hair Loss Treatment & Removal' },
  { label: 'Handbag, Luggage & Accessory' },
  { label: 'Hardware Stores' },
  { label: 'Health & Medical Insurance' },
  { label: 'Health Stores' },
  { label: 'Heating & Air Conditioning (HVAC)' },
  { label: 'Heavy Equipment Rental' },
  { label: 'Hobby & Toy Stores' },
  { label: 'Home Builders' },
  { label: 'Home Care Providers' },
  { label: 'Home Furnishings Stores' },
  { label: 'Home Improvement Stores' },
  { label: 'Homeowners\' Associations' },
  { label: 'Horse & Other Equine Production' },
  { label: 'Hospitals' },
  { label: 'Hotels & Motels' },
  { label: 'Household Furniture Manufacturing' },
  { label: 'Human Resources/HR' },
  { label: 'Hunting' },
  { label: 'Import/Export' },
  { label: 'Industrial Designers' },
  { label: 'Industrial Laundry & Linen Supply' },
  { label: 'Industrial Machinery & Equipment' },
  { label: 'Insurance Brokers & Agencies' },
  { label: 'Interior Designers' },
  { label: 'Internet Service Providers' },
  { label: 'Iron & Steel Manufacturing' },
  { label: 'IT Consulting' },
  { label: 'Janitorial Services' },
  { label: 'Jewelry Manufacturing' },
  { label: 'Jewelry Stores' },
  { label: 'Landscape Design' },
  { label: 'Landscaping Services' },
  { label: 'Language Instruction' },
  { label: 'Laundromats' },
  { label: 'Law Firms' },
  { label: 'Lawyers / Law Firms' },
  { label: 'Leather Good & Luggage Manufacturing' },
  { label: 'Leisure/Travel' },
  { label: 'Lighting Fixtures Manufacturing' },
  { label: 'Lingerie, Swimwear & Bridal Stores' },
  { label: 'Liquor, Wine & Beer' },
  { label: 'Local Freight Trucking' },
  { label: 'Long-Distance Freight Trucking' },
  { label: 'Lumber & Building Material Stores' },
  { label: 'Machine Shop Services' },
  { label: 'Maids, Nannies & Gardeners' },
  { label: 'Management Consulting' },
  { label: 'Manufactured Home Dealers' },
  { label: 'Market Research' },
  { label: 'Marketing/Advertising/Sales' },
  { label: 'Marriage Counselors' },
  { label: 'Masonry' },
  { label: 'Mattress Manufacturing' },
  { label: 'Meat Markets' },
  { label: 'Medical Device Manufacturing' },
  { label: 'Medical Instrument & Supply Manufacturing' },
  { label: 'Men\'s & Boys\' Apparel Manufacturing' },
  { label: 'Men\'s Clothing Stores' },
  { label: 'Mental Health & Substance Abuse' },
  { label: 'Metal Can & Container Manufacturing' },
  { label: 'Metal Pipe & Tube Manufacturing' },
  { label: 'Motorcycle Dealership and Repair' },
  { label: 'Motorcycle, Bike & Parts Manufacturing' },
  { label: 'Movie Theaters' },
  { label: 'Moving Services' },
  { label: 'Music Production' },
  { label: 'Musical Instrument & Supplies' },
  { label: 'Newspaper Publishing' },
  { label: 'Nursery & Garden Stores' },
  { label: 'Nursing Care Facilities' },
  { label: 'Office Staffing & Temp Agencies' },
  { label: 'Office Supply Stores' },
  { label: 'Optometrists' },
  { label: 'Other Machinery Manufacturing' },
  { label: 'Paint Stores' },
  { label: 'Painters' },
  { label: 'Paper Product Manufacturing' },
  { label: 'Parking Lots & Garages' },
  { label: 'Paving Contractors' },
  { label: 'Payday Lenders' },
  { label: 'Payroll & Bookkeeping Services' },
  { label: 'Performers & Creative Artists' },
  { label: 'Pest Control' },
  { label: 'Pet Grooming & Boarding' },
  { label: 'Pet Stores' },
  { label: 'Photography' },
  { label: 'Physical Therapists' },
  { label: 'Plastic & Resin Manufacturing' },
  { label: 'Plastic Bottle Manufacturing' },
  { label: 'Plastic Film, Sheet & Bag Manufacturing' },
  { label: 'Plastic Pipe & Parts Manufacturing' },
  { label: 'Plastic Products Miscellaneous Manufacturing' },
  { label: 'Plumbers' },
  { label: 'Podiatrists' },
  { label: 'Portable Toilet Rental & Septic Tank' },
  { label: 'Power Conversion Equipment Manufacturing' },
  { label: 'Precast Concrete Manufacturing' },
  { label: 'Prefabricated Home Manufacturing' },
  { label: 'Primary Care Doctors' },
  { label: 'Printing' },
  { label: 'Promotional Products' },
  { label: 'Property Management' },
  { label: 'Psychologists, Social Workers & Public Relations/PR' },
  { label: 'Public Storage & Warehousing' },
  { label: 'Quick Printing' },
  { label: 'Ready-Mix Concrete Manufacturing' },
  { label: 'Real Estate' },
  { label: 'Real Estate and Rental and Leasing' },
  { label: 'Real Estate Appraisal' },
  { label: 'Real Estate Investment Trusts' },
  { label: 'Religious Organizations' },
  { label: 'Remediation & Environmental' },
  { label: 'Remodeling' },
  { label: 'Restaurants' },
  { label: 'Roofing Contractors' },
  { label: 'Schools/Education' },
  { label: 'Security Alarm Services' },
  { label: 'Shoe & Footwear Manufacturing' },
  { label: 'Shoe Repair' },
  { label: 'Shoe Stores' },
  { label: 'Sightseeing Transportation' },
  { label: 'Ski & Snowboard Resorts' },
  { label: 'Small Specialty Retail Stores' },
  { label: 'Soap & Cleaning Compound Manufacturing' },
  { label: 'Solar Panel Manufacturing' },
  { label: 'Solar Power' },
  { label: 'Special Trade Contractors' },
  { label: 'Sporting Goods Stores' },
  { label: 'Staffing/Recruiting' },
  { label: 'Steel Framing' },
  { label: 'Structural Metal Product Manufacturing' },
  { label: 'Supermarkets & Grocery Stores' },
  { label: 'Surveying & Mapping Services' },
  { label: 'Swimming Pool Construction' },
  { label: 'Tanning Salons' },
  { label: 'Tax Preparation Services' },
  { label: 'Taxi & Limousine Services' },
  { label: 'Telemarketing & Call Centers' },
  { label: 'Television Production' },
  { label: 'Tile Installers' },
  { label: 'Tire Dealers' },
  { label: 'Tool & Equipment Rental' },
  { label: 'Tour Operators' },
  { label: 'Toy, Doll & Game Manufacturing' },
  { label: 'Trade & Technical Schools' },
  { label: 'Trade Show and Conference' },
  { label: 'Translation Services' },
  { label: 'Trash Collection/Waste Management' },
  { label: 'Travel Agencies' },
  { label: 'Truck Rental' },
  { label: 'Trusts & Estates' },
  { label: 'Tutoring & Driving Schools' },
  { label: 'TV / Movies / Music' },
  { label: 'Used Goods Stores' },
  { label: 'Vending Machine Operators' },
  { label: 'Veterinary Services' },
  { label: 'Vitamin & Supplement Manufacturing' },
  { label: 'Warehousing' },
  { label: 'Waste Collection Services' },
  { label: 'Water Supply & Irrigation Systems' },
  { label: 'Weight Loss Services' },
  { label: 'Wind Power' },
  { label: 'Wine, Beer & Liquor' }
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        //count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
        count < 3 && suggestion.label.toLowerCase().includes(inputValue);

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function IntegrationDownshift() {
  const classes = useStyles();
  const {
    handleIndustryChange,
  } = useMainContext();

  return (
    <div className={classes.root}>
      <div className={classes.divider} />
      <Downshift
        id="downshift-simple"
        onChange={handleIndustryChange}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Industry',
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: 'Industry',
                variant: 'outlined',
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onFocus },
                inputProps,
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                      }),
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}