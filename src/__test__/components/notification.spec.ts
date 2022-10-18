/**
 * @vitest-environment happy-dom
 */
import {mount} from '@vue/test-utils'
import {describe, expect, test} from 'vitest';
import Notification from '../../components/Notification.vue';


describe("Notification.vue", () => {
  test("renders correct style for error", () => {
      const type = "error";
      const wrapper = mount(Notification, {
          props: { type },
      });
      expect(wrapper.classes()).toEqual(
          expect.arrayContaining(["notification--error"])
      );
  });

  test("renders correct style for success", () => {
      const type = "success";
      const wrapper = mount(Notification, {
          props: { type },
      });
      expect(wrapper.classes()).toEqual(
          expect.arrayContaining(["notification--success"])
      );
  });

  test("renders correct style for info", () => {
      const type = "info";
      const wrapper = mount(Notification, {
          props: { type },
      });
      expect(wrapper.classes()).toEqual(
          expect.arrayContaining(["notification--info"])
      );
  });

  test("slides down when message is not empty", () => {
      const message = "success";
      const wrapper = mount(Notification, {
          props: { message },
      });
      expect(wrapper.classes()).toEqual(
          expect.arrayContaining(["notification--slide"])
      );
  });

  test("emits event when close button is clicked", async() => {
    const wrapper = mount(Notification, {
        data() {
            return {
                clicked: false,
            };
        },
    });
    const closeButton = wrapper.find("button");
    await closeButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clear-notification");
  });

  test("emits event when close button is clicked", async() => {
    const wrapper = mount(Notification, {
        data() {
            return {
                clicked: false,
            };
        },
    });
    const closeButton = wrapper.find("button");
    await closeButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("clear-notification");
  });
});