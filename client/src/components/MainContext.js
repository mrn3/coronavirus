import { useState } from "react";
import createUseContext from "constate"; // State Context Object Creator
import moment from 'moment';

// Step 1: Create a custom hook that contains your state and actions
function useMain() {
    
    //----------------------------------------------------------------------------------------------------
    //Analyze
    //----------------------------------------------------------------------------------------------------

    const [activeStep, setActiveStep] = useState(0);
    const scrollToTop = () => {
        //window.scrollTo(0, 0);
        setTimeout(() => {
            window.scrollTo({
              behavior: 'smooth',
              top: 0
            });
          }, 100);
    }
    const pathArray = [
        '/analyze/business',
        '/analyze/revenue',
        '/analyze/service',
        '/analyze/google',
        '/analyze/analyzing',
        '/analyze/result'
    ];
    const handleNext = (props) => {
        props.history.push(pathArray[activeStep + 1]); 
        setActiveStep(activeStep + 1);
        scrollToTop();
    };
    const handleBack = (props) => {
        props.history.push(pathArray[activeStep - 1]);
        if (activeStep === 5) {
            props.history.push("/analyze/google");
        } else {
            setActiveStep(activeStep - 1);
        }
        scrollToTop();
    };
    const [loading] = useState(false);

    //----------------------------------------------------------------------------------------------------
    //Business
    //----------------------------------------------------------------------------------------------------

    const [url, setUrl] = useState('');
    const handleUrlChange = (event) => setUrl(event.target.value);
    const [urlInvalid, setUrlInvalid] = useState(false);
    const handleUrlBlur = () => {
        if (url) {
            var re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
            let isValidUrl = re.test(String(url).toLowerCase());
            setUrlInvalid(!isValidUrl);
        }
    };

    const [industry, setIndustry] = useState('');
    const handleIndustryChange = (selection) => setIndustry(selection);
    
    const [businessType, setBusinessType] = useState('');
    const handleBusinessTypeChange = (event) => setBusinessType(event.target.value);

    const [businessSeasonality, setBusinessSeasonality] = useState('');
    const handleBusinessSeasonalityChange = (event) => setBusinessSeasonality(event.target.value);

    const [contactName, setContactName] = useState('');
    const handleContactNameChange = (event) => setContactName(event.target.value);

    const [contactEmail, setContactEmail] = useState('');
    const handleContactEmailChange = (event) => setContactEmail(event.target.value);
    const [contactEmailInvalid, setContactEmailInvalid] = useState(false);
    const handleContactEmailBlur = () => {
        if (contactEmail) {
            //make sure email is valid
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let isValidContactEmail = re.test(String(contactEmail).toLowerCase());
            setContactEmailInvalid(!isValidContactEmail);
        }
    };

    //----------------------------------------------------------------------------------------------------
    //Revenue
    //----------------------------------------------------------------------------------------------------

    const [revenueDialog, setRevenueDialog] = useState(false);
    const closeRevenueDialog = (event) => {
        setRevenueDialog(false);
    }

    const [annualRevenue, setAnnualRevenue] = useState('');
    const handleAnnualRevenueChange = (event) => setAnnualRevenue(event.target.value);
    const [annualRevenueInvalid, setAnnualRevenueInvalid] = useState(false);
    const handleAnnualRevenueBlur = () => {
        if (annualRevenue) {
            let trimmedAnnualRevenue = annualRevenue.replace(/[,]+/g, '').trim();
            let parsedAnnualRevenue = parseInt(trimmedAnnualRevenue);
            if (!isNaN(parsedAnnualRevenue)) {
                setAnnualRevenue(parsedAnnualRevenue)
            }
            setAnnualRevenueInvalid(!Number.isInteger(parsedAnnualRevenue));
        }
    };

    const handleAddProduct = async () => {
        await setCurrentProductName('');
        await setCurrentProductPercentage(0);
        await setCurrentProductRevenuePerTransaction('');
        await setCurrentProductProfitMargin('');
        await setCurrentProductQuantitySold('');
        await setCurrentProductCustomerType('');
        await setCurrentProductPurchaseTimes('');
        await setCurrentProductPurchaseInterval('');
        await setCurrentProductIndex(-1);
        openRevenueDialog();
    };
    const handleDeleteProduct = (idx) => () => {
        setProductArray(productArray.filter((s, sidx) => idx !== sidx));
    };
    const handleEditProduct = (idx) => () => {
        let currentProduct = productArray[idx];
        setCurrentProductName(currentProduct.name);
        setCurrentProductPercentage(currentProduct.percentage);
        setCurrentProductRevenuePerTransaction(currentProduct.revenuePerTransaction);
        setCurrentProductProfitMargin(currentProduct.profitMargin);
        setCurrentProductQuantitySold(currentProduct.quantitySold);
        setCurrentProductCustomerType(currentProduct.customerType);
        setCurrentProductPurchaseTimes(currentProduct.purchaseTimes);
        setCurrentProductPurchaseInterval(currentProduct.purchaseInterval);
        setCurrentProductIndex(idx);
        openRevenueDialog();
    };
    const [productArray, setProductArray] = useState([]);

    const [currentProductIndex, setCurrentProductIndex] = useState(-1);
    const openRevenueDialog = (event) => {
        setRevenueDialog(true);
    }
    
    //----------------------------------------------------------------------------------------------------
    //Revenue Dialog
    //----------------------------------------------------------------------------------------------------

    const handleProductSubmit = (event) => {
        let newProduct = {
            name: currentProductName,
            percentage: currentProductPercentage,
            revenuePerTransaction: currentProductRevenuePerTransaction,
            profitMargin: currentProductProfitMargin,
            quantitySold: currentProductQuantitySold,
            customerType: currentProductCustomerType,
            purchaseTimes: currentProductPurchaseTimes,
            purchaseInterval: currentProductPurchaseInterval
        }
        if (currentProductIndex < 0) {   //new
            setProductArray(productArray.concat([newProduct]));
        } else {
            let newProductArray = productArray;
            newProductArray[currentProductIndex] = newProduct;
            setProductArray(newProductArray);
        }
        closeRevenueDialog();
    };
    
    const [currentProductName, setCurrentProductName] = useState('');
    const handleCurrentProductNameChange = (event) => setCurrentProductName(event.target.value);

    const [currentProductPercentage, setCurrentProductPercentage] = useState(0);
    const handleCurrentProductPercentageChange = (event, value) => setCurrentProductPercentage(value);

    const [currentProductRevenuePerTransaction, setCurrentProductRevenuePerTransaction] = useState('');
    const handleCurrentProductRevenuePerTransactionChange = (event) => setCurrentProductRevenuePerTransaction(event.target.value);
    const [currentProductRevenuePerTransactionInvalid, setCurrentProductRevenuePerTransactionInvalid] = useState(false);
    const handleCurrentProductRevenuePerTransactionBlur = () => {
        if (currentProductRevenuePerTransaction) {
            let trimmedRevenuePerTransaction = currentProductRevenuePerTransaction.replace(/[,]+/g, '').trim();
            let parsedRevenuePerTransaction = parseInt(trimmedRevenuePerTransaction);
            if (!isNaN(parsedRevenuePerTransaction)) {
                setCurrentProductRevenuePerTransaction(parsedRevenuePerTransaction);
            }
            setCurrentProductRevenuePerTransactionInvalid(!Number.isInteger(parsedRevenuePerTransaction));
        }
    };

    const [currentProductProfitMargin, setCurrentProductProfitMargin] = useState('');
    const handleCurrentProductProfitMarginChange = (event) => setCurrentProductProfitMargin(event.target.value);
    const [currentProductProfitMarginInvalid, setCurrentProductProfitMarginInvalid] = useState(false);
    const handleCurrentProductProfitMarginBlur = () => {
        if (currentProductProfitMargin) {
            let trimmedProfitMargin = currentProductProfitMargin.replace(/[,]+/g, '').trim();
            let parsedProfitMargin = parseInt(trimmedProfitMargin);
            if (!isNaN(parsedProfitMargin)) {
                setCurrentProductProfitMargin(parsedProfitMargin);
            }
            setCurrentProductProfitMarginInvalid(!Number.isInteger(parsedProfitMargin));
        }
    };

    const [currentProductQuantitySold, setCurrentProductQuantitySold] = useState('');
    const handleCurrentProductQuantitySoldChange = (event) => setCurrentProductQuantitySold(event.target.value);
    const [currentProductQuantitySoldInvalid, setCurrentProductQuantitySoldInvalid] = useState(false);
    const handleCurrentProductQuantitySoldBlur = () => {
        if (currentProductQuantitySold) {
            let trimmedQuantitySold = currentProductQuantitySold.replace(/[,]+/g, '').trim();
            let parsedQuantitySold = parseInt(trimmedQuantitySold);
            if (!isNaN(parsedQuantitySold)) {
                setCurrentProductQuantitySold(parsedQuantitySold);
            }
            setCurrentProductQuantitySoldInvalid(!Number.isInteger(parsedQuantitySold));
        }
    };
    
    const [currentProductCustomerType, setCurrentProductCustomerType] = useState('');
    const handleCurrentProductCustomerTypeChange = (event) => setCurrentProductCustomerType(event.target.value);
    
    const [currentProductPurchaseTimes, setCurrentProductPurchaseTimes] = useState('');
    const handleCurrentProductPurchaseTimesChange = (event) => setCurrentProductPurchaseTimes(event.target.value);
    
    const [currentProductPurchaseInterval, setCurrentProductPurchaseInterval] = useState('');
    const handleCurrentProductPurchaseIntervalChange = (event) => setCurrentProductPurchaseInterval(event.target.value);
    
    //----------------------------------------------------------------------------------------------------
    //Service
    //----------------------------------------------------------------------------------------------------
    
    const [serviceDialog, setServiceDialog] = useState(false);
    const closeServiceDialog = (event) => {
        setServiceDialog(false);
    }

    const handleAddService = async () => {
        await setCurrentServiceType('');
        await setCurrentServiceProviderName('');
        await setCurrentServiceProviderUrl('');
        await setCurrentServiceBillingPerMonth('');
        await setCurrentServiceStartedAt('');
        await setCurrentServiceRating(0);
        await setCurrentServiceIndex(-1);
        openServiceDialog();
    };
    const handleDeleteService = (idx) => () => {
        setServiceArray(serviceArray.filter((s, sidx) => idx !== sidx));
    };
    const handleEditService = (idx) => () => {
        let currentService = serviceArray[idx];
        setCurrentServiceType(currentService.type);
        setCurrentServiceProviderName(currentService.providerName);
        setCurrentServiceProviderUrl(currentService.providerUrl);
        setCurrentServiceBillingPerMonth(currentService.billingPerMonth);
        setCurrentServiceStartedAt(currentService.startedAt);
        setCurrentServiceRating(currentService.rating);
        setCurrentServiceIndex(idx);
        openServiceDialog();
    };
    const [serviceArray, setServiceArray] = useState([]);

    const [currentServiceIndex, setCurrentServiceIndex] = useState(-1);
    const openServiceDialog = (event) => {
        setServiceDialog(true);
    }

    //----------------------------------------------------------------------------------------------------
    //Service Dialog
    //----------------------------------------------------------------------------------------------------

    const handleServiceSubmit = (event) => {
        let newService = {
            type: currentServiceType,
            providerName: currentServiceProviderName,
            providerUrl: currentServiceProviderUrl,
            billingPerMonth: currentServiceBillingPerMonth,
            startedAt: currentServiceStartedAt,
            rating: currentServiceRating
        }
        if (currentServiceIndex < 0) {   //new
            setServiceArray(serviceArray.concat([newService]));
        } else {
            let newServiceArray = serviceArray;
            newServiceArray[currentServiceIndex] = newService;
            setServiceArray(newServiceArray);
        }
        closeServiceDialog();
    };
    
    const [currentServiceType, setCurrentServiceType] = useState('');
    const handleCurrentServiceTypeChange = (event) => setCurrentServiceType(event.target.value);
    const [currentServiceProviderName, setCurrentServiceProviderName] = useState('');
    const handleCurrentServiceProviderNameChange = (event) => setCurrentServiceProviderName(event.target.value);

    const [currentServiceProviderUrl, setCurrentServiceProviderUrl] = useState('');
    const handleCurrentServiceProviderUrlChange = (event) => setCurrentServiceProviderUrl(event.target.value);
    const [currentServiceProviderUrlInvalid, setCurrentServiceProviderUrlInvalid] = useState(false);
    const handleCurrentServiceProviderUrlBlur = () => {
        if (currentServiceProviderUrl) {
            var re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
            let isValidCurrentServiceProviderUrl = re.test(String(currentServiceProviderUrl).toLowerCase());
            setCurrentServiceProviderUrlInvalid(!isValidCurrentServiceProviderUrl);
        }
    };

    const [currentServiceBillingPerMonth, setCurrentServiceBillingPerMonth] = useState('');
    const handleCurrentServiceBillingPerMonthChange = (event) => setCurrentServiceBillingPerMonth(event.target.value);
    const [currentServiceBillingPerMonthInvalid, setCurrentServiceBillingPerMonthInvalid] = useState(false);
    const handleCurrentServiceBillingPerMonthBlur = () => {
        if (currentServiceBillingPerMonth) {
            let trimmedRevenuePerTransaction = currentServiceBillingPerMonth.replace(/[,]+/g, '').trim();
            let parsedRevenuePerTransaction = parseInt(trimmedRevenuePerTransaction);
            if (!isNaN(parsedRevenuePerTransaction)) {
                setCurrentServiceBillingPerMonth(parsedRevenuePerTransaction);
            }
            setCurrentServiceBillingPerMonthInvalid(!Number.isInteger(parsedRevenuePerTransaction));
        }
    };
    
    const [currentServiceStartedAt, setCurrentServiceStartedAt] = useState('');
    const handleCurrentServiceStartedAtChange = (event) => setCurrentServiceStartedAt(event.target.value);
    const [currentServiceStartedAtInvalid, setCurrentServiceStartedAtInvalid] = useState(false);
    const handleCurrentServiceStartedAtBlur = () => {
        if (currentServiceStartedAt) {
            let currentServiceStartedAtMoment = moment(currentServiceStartedAt);
            setCurrentServiceStartedAtInvalid(!currentServiceStartedAtMoment.isValid());
        }
    };
    
    const [currentServiceRating, setCurrentServiceRating] = useState('');
    const handleCurrentServiceRatingChange = (event, value) => setCurrentServiceRating(value);

    //----------------------------------------------------------------------------------------------------
    //Google Analytics
    //----------------------------------------------------------------------------------------------------

    const [timeline, setTimeline] = useState({});
    const handleTimelineChange = (inTimeline) => {
        setTimeline(inTimeline);
    }

    return { 
        //Analyze
        activeStep, 
        setActiveStep,
		handleNext, 
        handleBack,
        loading,

        //Business
        url, 
		handleUrlChange, 
		urlInvalid, 
        handleUrlBlur,

        industry,
        handleIndustryChange,

        businessType,
        handleBusinessTypeChange,

        businessSeasonality,
        handleBusinessSeasonalityChange,

        contactName,
        handleContactNameChange,

        contactEmail,
        handleContactEmailChange,
        contactEmailInvalid,
        handleContactEmailBlur,
        
        //Revenue
        revenueDialog,
        closeRevenueDialog,

        annualRevenue,
        handleAnnualRevenueChange,
        annualRevenueInvalid,
        handleAnnualRevenueBlur,

        handleAddProduct,
        handleDeleteProduct,
        handleEditProduct,
        productArray,

        //Revenue Dialog
        currentProductIndex,
        
        handleProductSubmit,
		
		currentProductName,
		handleCurrentProductNameChange,

		currentProductPercentage,
		handleCurrentProductPercentageChange,

		currentProductRevenuePerTransaction,
		handleCurrentProductRevenuePerTransactionChange,
		currentProductRevenuePerTransactionInvalid,
        handleCurrentProductRevenuePerTransactionBlur,
        
        currentProductProfitMargin,
		handleCurrentProductProfitMarginChange,
		currentProductProfitMarginInvalid,
        handleCurrentProductProfitMarginBlur,
        
        currentProductQuantitySold,
		handleCurrentProductQuantitySoldChange,
		currentProductQuantitySoldInvalid,
		handleCurrentProductQuantitySoldBlur,
		
		currentProductCustomerType,
		handleCurrentProductCustomerTypeChange,
		
		currentProductPurchaseTimes,
		handleCurrentProductPurchaseTimesChange,
		
		currentProductPurchaseInterval,
		handleCurrentProductPurchaseIntervalChange,

        //Service
        serviceDialog,
        closeServiceDialog,

        handleAddService,
        handleDeleteService,
        handleEditService,
        serviceArray,

        //Service Dialog
        currentServiceIndex,
        
        handleServiceSubmit,
		
		currentServiceType,
        handleCurrentServiceTypeChange,
        
		currentServiceProviderName,
        handleCurrentServiceProviderNameChange,
        
        currentServiceProviderUrl,
        handleCurrentServiceProviderUrlChange,
        currentServiceProviderUrlInvalid,
        handleCurrentServiceProviderUrlBlur,

		currentServiceBillingPerMonth,
		handleCurrentServiceBillingPerMonthChange,
		currentServiceBillingPerMonthInvalid,
        handleCurrentServiceBillingPerMonthBlur,
		
		currentServiceStartedAt,
        handleCurrentServiceStartedAtChange,
        currentServiceStartedAtInvalid, 
        handleCurrentServiceStartedAtBlur,
		
		currentServiceRating,
		handleCurrentServiceRatingChange,

        //Google API
        timeline,
        handleTimelineChange,
    };
}

// Step 2: Declare your context state object to share the state with other components
export const useMainContext = createUseContext(useMain);