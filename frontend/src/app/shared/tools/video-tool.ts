export class VideoTool {
    static get toolbox() {
        return {
            title: 'Video',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
              </svg>`
        };
    }

    static get isReadOnlySupported(): boolean {
        return true
    }

    private data: any;
    private config: any
    private wrapper!: HTMLElement
    constructor({ data, config }: any) {
        this.data = data
        this.config = config;
    }

    render() {
        this.wrapper = document.createElement('div')
        this.wrapper.classList.add("video-tool")

        if (this.data.url) {
            this.renderVideo()
        } else {
            this.renderUpload()
        }
        return this.wrapper
    }

    private renderVideo() {
        const video = document.createElement('video')
        video.src = this.data.url;
        video.controls = true;
        this.wrapper.appendChild(video)
    }

    private renderUpload() {
        const input = document.createElement('input');
        const label = document.createElement('label')
        input.id = 'upload-video'
        input.type = 'file';
        label.setAttribute('for', 'upload-video')
        label.textContent += 'Select an video'
        label.classList.add('upload-video')
        input.style.display = 'none';
        input.accept = 'video/*'

        input.onchange = async () => {
            if (!input.files?.length) return;
            const file = input.files[0];

            this.loader()
            try {
                const response = await this.uploadVideo(file);
                if (response.success === 1) this.data.url = response.file.url;
            } catch (err) {
                this.wrapper.replaceChildren()
                throw err
            }

            this.wrapper.replaceChildren()
            this.renderVideo();
        };

        this.wrapper.appendChild(label)
        this.wrapper.appendChild(input);

        input.click()
    }

    private async uploadVideo(file: File) {
        return this.config.uploader(file)
    }

    private loader() {
        const div = document.createElement('div')
        const loadDiv = document.createElement('div')
        loadDiv.classList.add('loader')
        div.classList.add('upload-video-loader')
        div.appendChild(loadDiv);

        this.wrapper.replaceChildren(div)
    }

    save(blockContent: any) {
        return this.data
    }

    validate(savedData: any) {
        if (!savedData.url || !savedData.url.trim()) {
            return false;
        }

        return true;
    }
}