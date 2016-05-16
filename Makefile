PROJECT_NAME = TimeToBeHero
IOS_APP_ID = 1073614665
IOS_DIR = platforms/ios
IOS_ITMSP = $(IOS_DIR)/$(PROJECT_NAME).itmsp
XCODEPROJ = $(IOS_DIR)/$(PROJECT_NAME).xcodeproj
IOS_BUILD = $(IOS_DIR)/build/$(PROJECT_NAME).build
IOS_BUILD_FILES := $(shell find $(IOS_BUILD) -type f)
IOS_ARCHIVE = $(IOS_DIR)/$(PROJECT_NAME).xcarchive
IOS_IPA = $(IOS_DIR)/$(PROJECT_NAME).ipa
IOS_PROVISION_PROFILE = "Time To Be Hero AppStore Distribution"
SOURCES = $(shell find www -type f)
CORDOVA_CONFIGS = config.xml build.json
CORDOVA_OPTS = --debug
ITMSTRANSPORTER = "$(shell dirname $(shell xcode-select --print-path))/Applications/Application Loader.app/Contents/itms/bin/iTMSTransporter"
SECURITY_LABEL = E18F89B2-E839-4AC6-82B8-0AD1192EA5F7
ITMST_USER := $(shell security find-generic-password -l $(SECURITY_LABEL) | sed -En '/acct/ s/^\W+"acct"<blob>="(.*)"$$/\1/p')
ITMST_PASS := $(shell security find-generic-password -l $(SECURITY_LABEL) -w)
define ITMSP_METADATA
<?xml version="1.0" encoding="UTF-8"?>
<package version="software5.2" xmlns="http://apple.com/itunes/importer">
    <software_assets apple_id="$(IOS_APP_ID)">
        <asset type="bundle">
            <data_file>
                <file_name>$(PROJECT_NAME).ipa</file_name>
                <checksum type="md5">$(shell md5 -q $(IOS_IPA))</checksum>
                <size>$(shell stat --format "%s" $(IOS_IPA))</size>
            </data_file>
        </asset>
    </software_assets>
</package>
endef

.DEFAULT_GOAL := help

.PHONY: nop check-itmstransporter deps build build-ios open-xcode clean clean-ios publish publish-ios

help:
	@echo "Usage: make {TARGET}"
	@echo ""
	@echo "deps           Install required dependencies (do it first)"
	@echo "set-security   Add iTunes Connect credentials to Login Keychain (do it second)"
	@echo "build          Build artifacts for all defined platforms"
	@echo "publish        Publish artifacts to store(-s)"
	@echo "clean          Cleanup project from build artifacts"
	@echo "open-xcode     Open XCode project for iOS platform"


deps: 
	-xcode-select --install
	npm install -g cordova
	npm install -g bower
	cd www/js; bower install
	gem install xcpretty

set-security:
	@read -p 'iTunes Connect Account: ' itc_acct && \
	read -p 'Password: ' -s itc_pass && \
	security add-generic-password -a $${itc_acct} -l $(SECURITY_LABEL) -s 'iTSMTransporter Automation' -w $${itc_pass} -U && echo -e "\nA generic password with label $(SECURITY_LABEL) added to login keychain"

open-xcode: $(XCODEPROJ)
	$(info Please note that when opening your project in Xcode, \
	it is recommended that you do NOT edit your code in the IDE. This will edit \
	the code in the platforms folder of your project \(not www\), and changes are \
	liable to be overwritten. \
	Instead, edit the www folder and copy over your changes by running cordova build.)
	open $(XCODEPROJ)

clean: clean-ios

clean-ios:
	cordova clean ios
	-rm -fr $(IOS_ARCHIVE) $(IOS_IPA) $(IOS_ITMSP)

build: build-ios

build-ios: $(XCODEPROJ)

$(XCODEPROJ) $(IOS_BUILD): $(SOURCES) $(CORDOVA_CONFIGS)
	cordova build ios $(CORDOVA_OPTS)
	touch $(XCODEPROJ)

publish: publish-ios

$(IOS_ARCHIVE): $(IOS_BUILD) $(IOS_BUILD_FILES)
	set -o pipefail && xcodebuild archive -project $(XCODEPROJ) -sdk iphoneos -scheme $(PROJECT_NAME) -archivePath $(IOS_ARCHIVE) | xcpretty

$(IOS_IPA): $(IOS_ARCHIVE)
	set -o pipefail && xcodebuild -exportArchive -archivePath $(IOS_ARCHIVE) -exportPath $(IOS_DIR) -exportOptionsPlist appstore-export-options.plist | xcpretty

export ITMSP_METADATA
$(IOS_ITMSP): $(IOS_IPA)
	@mkdir $(IOS_ITMSP)
	@echo $$ITMSP_METADATA > $(IOS_ITMSP)/metadata.xml
	@cp $(IOS_IPA) $(IOS_ITMSP)/

publish-ios: $(IOS_ITMSP)
	@$(ITMSTRANSPORTER) -m upload -f $(IOS_ITMSP) -u $(ITMST_USER) -p $(ITMST_PASS) -v informational
