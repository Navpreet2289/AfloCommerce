
export class catalog-source {
    static fields: Array <any> = [
        { field: 'title', heading: 'Title', list: true },
        { field: 'sourcePath', heading: 'Source Path', list: true },
        { field: 'approved', heading: 'Approved', dataType: 'boolean', list: true }
    ];
}
