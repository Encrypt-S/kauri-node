"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
let StubController = class StubController {
    constructor() { }
    getQuoteBlob(req, res) {
        const projectId = req.params.id;
        const testId = 219;
        if (parseInt(projectId) != testId) {
            return res.status(200).json({
                err: false,
                res: {
                    project_id: projectId,
                    quote_id: 1,
                    revision_id: 1,
                    section_data: []
                }
            });
        }
        const quoteBlob = {
            project_id: testId,
            quote_id: 1,
            revision_id: 1,
            section_data: [
                {
                    id: 'section0',
                    title: 'Setup',
                    data: {
                        text: 'Test Data',
                    },
                    renamable: false,
                    reorderable: false,
                    visible: true,
                    type: 'SETUP',
                },
                {
                    id: 'section1',
                    title: 'Cover Page',
                    data: {
                        project_name: 'BORN_00001',
                        quote_date: '28 June 2019',
                    },
                    renamable: false,
                    reorderable: false,
                    visible: true,
                    type: 'COVER',
                },
                {
                    id: 'section2',
                    title: 'Why Candor',
                    data: {
                        mce: '<h1>Test data from backend</h1><p>Curabitur nibh mi, pharetra aliquet interdum nec, gravida eget risus. Nullam eget tristique arcu, gravida volutpat velit. Duis facilisis maximus ligula id lobortis. Aenean quis mi viverra mauris semper viverra. Phasellus ut nulla sit amet tellus fringilla porttitor eu ac sem. Cras sed nibh a nulla hendrerit molestie non sit amet nunc. In hac habitasse platea dictumst. Pellentesque elit nisi, volutpat id varius eu, malesuada in nibh.</p>',
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section3',
                    title: 'A Selection of Current Projects',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section4',
                    title: 'Scope of Service',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section5',
                    title: 'Project Timing',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section6',
                    title: 'Resources',
                    data: {
                        resources: [
                            {text: 'Resource Stub 1'},
                            {text: 'Resource Stub 2'},
                            {text: 'Resource Stub 3'}
                        ]
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'RESOURCES',
                },
                {
                    id: 'section7',
                    title: 'Professional Consultancy Fees',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section8',
                    title: 'Owner Sign-off',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section9',
                    title: 'IPENZ Conditions',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: 'section10',
                    title: 'Variations / Addendums',
                    data: {
                        mce: 'Test Data'
                    },
                    renamable: true,
                    reorderable: true,
                    visible: true,
                    type: 'STANDARD',
                },
                {
                    id: '90ee1dc0-02c6-4cd5-8064-ea2ec7f55e37',
                    title: 'Custom Section',
                    data: {
                        mce: 'Test Data For Custom Section'
                    },
                    renamable: true,
                    reorderable: false,
                    visible: true,
                    type: 'CUSTOM',
                },
                {
                    id: 'section11',
                    title: 'Back Cover',
                    data: {
                        project_name: 'BORN_00001',
                        quote_date: '28 June 2019',
                    },
                    renamable: false,
                    reorderable: false,
                    visible: true,
                    type: 'BACK_COVER',
                },
                {
                    id: 'section12',
                    title: 'Recipients',
                    data: {
                        project_name: 'BORN_00001',
                        quote_date: '28 June 2019',
                    },
                    renamable: false,
                    reorderable: false,
                    visible: true,
                    type: 'BACK_COVER',
                },
            ]
        };
        return res.status(200).json({
            err: false,
            res: quoteBlob
        });
    }
    updateQuoteBlob(req, res) {
        const projectId = req.params.id;
        setTimeout(() => {
            return res.status(200).json({
                err: false,
                res: {
                    message: 'Quote json blob updated successfully'
                }
            });
        }, 2000);
    }
    createQuoteBlob(req, res) {
        const projectId = req.params.id;
        return res.status(200).json({
            err: false,
            res: {
                message: 'Quote json blob created successfully'
            }
        });
    }
    uploadQuoteImage(req, res) {
        const projectId = req.params.id;
        return res.status(200).json({
            location: 'http://localhost:3000/images/puppy.jpg'
        });
    }
};
tslib_1.__decorate([
    core_1.Get('quote/blob/:id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StubController.prototype, "getQuoteBlob", null);
tslib_1.__decorate([
    core_1.Put('quote/blob/:id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StubController.prototype, "updateQuoteBlob", null);
tslib_1.__decorate([
    core_1.Post('quote/blob/:id'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StubController.prototype, "createQuoteBlob", null);
tslib_1.__decorate([
    core_1.Post('quote/image'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StubController.prototype, "uploadQuoteImage", null);
StubController = tslib_1.__decorate([
    core_1.Controller('api/v1'),
    tslib_1.__metadata("design:paramtypes", [])
], StubController);
exports.StubController = StubController;
