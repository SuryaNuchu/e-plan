package com.ooad.eplan.services;

import com.ooad.eplan.services.serviceImpl.IImportService;

public class ImportServiceFactory {
    public static IImportService getImportService(String fileExtension){
        switch (fileExtension){
            case "xlsx": return new XLXSImportService();
            case "csv": return new CsvImportService();
            case "txt": return new TxtImportService();
            default: return null;
        }
    }
}
